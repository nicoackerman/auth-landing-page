import { stablishSecureConnection } from "../db/index.js";
import { RolesRepository } from "./roles-repository.js";
import boom from "@hapi/boom";

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
    if (await this.isEmailTaken(email)) throw boom.conflict("Email is taken");
    if (await this.isUsernameTaken(username))
      throw boom.conflict("Username is taken");
    if (await this.isRoleIdInvalid(roleId))
      throw boom.badRequest(`Role id: ${roleId} given is invalid`);

    const [data] = await this.connection.query(
      "INSERT INTO Users (username, email, password, role_id) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, roleId]
    );
    return data.insertId;
  }

  async delete(id) {
    if (await this.get(id)) throw boom.notFound("User not found");

    const [data] = await this.connection.query(
      "DELETE FROM Users WHERE id = ?",
      [email]
    );

    console.log("data: ", data);

    if (!(await this.get(id))) throw boom.internal("User couldn't be deleted");

    return true;
  }

  async get(id) {
    const [data] = await this.connection.query(
      "SELECT id FROM Users WHERE id = ? LIMIT 1",
      [email]
    );
    return data.length == 0 ? null : data[0];
  }

  async getByEmail(email) {
    const [data] = await this.connection.query(
      "SELECT * FROM Users WHERE email = ? LIMIT 1",
      [email]
    );
    console.log("user", data[0]);
    return data.length == 0 ? null : data[0];
  }
}

const connection = await stablishSecureConnection();
export const UsersRepository = new _UsersRepository(connection);
