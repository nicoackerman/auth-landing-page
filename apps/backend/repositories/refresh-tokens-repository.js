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
  async getByToken(token_hash) {
    const [result] = await connection.query(
      "SELECT * FROM Refresh_tokens WHERE token_hash = ? LIMIT 1",
      [token_hash]
    );
    return result.affectedRows;
  }
  async isValid(token_hash) {
    const [data] = this.getByToken(token_hash);

    const tokenExists = data.length > 0;
    if (!tokenExists) throw Error("Refresh Token was not found");

    const isRevoked = data[0].revoked;
    if (isRevoked) return false;

    const isExpired = data[0].expires_at < new Date();
    if (isExpired) {
      this.revokeToken(token_hash);
      return false;
    }

    return true;
  }
  async revokeToken(token_hash) {
    const [result] = await connection.query(
      "UPDATE Refresh_tokens SET revoked = TRUE WHERE token_hash = ?",
      [token_hash]
    );
    console.log(result.affectedRows);
    return result.affectedRows;
  }
}

const connection = await stablishSecureConnection();
export const RefreshTokensRepository = new _RefreshTokensRepository(connection);
