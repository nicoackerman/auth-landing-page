import { stablishSecureConnection } from "../db/index.js";
import { RolesRepository } from "./roles-repository.js";

class _UsersRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async isUsernameTaken(username) {
    const [data] = await this.connection.query(
      "SELECT id FROM Users WHERE username = ? LIMIT 1",
      [username]
    );
    return data.length > 0;
  }

  async isEmailTaken(email) {
    const [data] = await this.connection.query(
      "SELECT id FROM Users WHERE email = ? LIMIT 1",
      [email]
    );
    return data.length > 0;
  }

  async isRoleIdValid(id) {
    const data = await RolesRepository.getById(id);
    return data == null ? false : true;
  }

  async create(username, email, hashedPassword, roleId) {
    if (await this.isEmailTaken(email)) throw Error("Email is taken");
    if (await this.isUsernameTaken(username)) throw Error("Username is taken");
    if (await this.isRoleIdValid(roleId)) throw Error("Role id given is invalid");

    const [data] = await this.connection.query(
      "INSERT INTO Users (username, email, password_hash, role_id) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, roleId]
    );
    return {
      id: data.insertId,
    };
  }
}

const connection = await stablishSecureConnection();
export const UsersRepository = new _UsersRepository(connection);
