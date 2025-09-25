import { stablishSecureConnection } from "../db/index.js";

class _RefreshTokensRepository {
  constructor(connection) {
    this.connection = connection;
  }
  static async create(user_id, token_hash, expires_at) {
    try {
      const [data, fields] = await connection.query(
        "INSERT INTO Refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
        [user_id, token_hash, expires_at]
      );
      return {
        id: data.insertId,
      };
    } catch (error) {
      console.error(error);
    }
  }
}

const connection = await stablishSecureConnection();
export const RefreshTokensRepository = new _RefreshTokensRepository(connection);
