import { stablishSecureConnection } from "../db/index.js";

class _RefreshTokensRepository {
  constructor(connection) {
    this.connection = connection;
  }
  async insert(user_id, token_hash, expires_at) {
    const [data, fields] = await connection.query(
      "INSERT INTO Refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
      [user_id, token_hash, expires_at]
    );
    return data.insertId;
  }
  async invalidateByUserId(id) {
    const [result] = await connection.query(
      "UPDATE Refresh_tokens SET revoked = TRUE WHERE user_id = ?",
      [id]
    );
    return result.affectedRows;
  }
}

const connection = await stablishSecureConnection();
export const RefreshTokensRepository = new _RefreshTokensRepository(connection);
