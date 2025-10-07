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

  async isRoleIdInvalid(id) {
    const data = await RolesRepository.getById(id);
    console.log(data == null ? false : true);
    return data == null ? true : false;
  }

  async create(username, email, hashedPassword, roleId) {
    if (await this.isEmailTaken(email)) throw Error("Email is taken");
    if (await this.isUsernameTaken(username)) throw Error("Username is taken");
    if (await this.isRoleIdInvalid(roleId))
      throw Error(`Role id: ${roleId} given is invalid`);

    const [data] = await this.connection.query(
      "INSERT INTO Users (username, email, password, role_id) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, roleId]
    );
    return data.insertId;
  }

  async getByEmail(email) {
    const [data] = await this.connection.query(
      "SELECT id, email, username password, role_id FROM Users WHERE email = ? LIMIT 1",
      [email]
    );
    return data.length == 0 ? null : data[0];
  }
}

const connection = await stablishSecureConnection();
export const UsersRepository = new _UsersRepository(connection);
