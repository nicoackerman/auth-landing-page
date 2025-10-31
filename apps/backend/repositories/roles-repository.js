import { stablishSecureConnection } from "../db/index.js";

class _RolesRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async getByName(role) {
    const [data] = await this.connection.query(
      "SELECT id, role FROM Roles WHERE role = ? LIMIT 1",
      [role]
    );
    return data.length > 0 ? data[0].id : null;
  }
  async getById(id) {
    const [data] = await this.connection.query(
      "SELECT id, role FROM Roles WHERE id = ? LIMIT 1",
      [id]
    );
    return data.length > 0 ? data[0].role : null;
  }
}

const connection = await stablishSecureConnection();
export const RolesRepository = new _RolesRepository(connection);
