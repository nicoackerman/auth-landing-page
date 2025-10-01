import boom from "@hapi/boom";
import { RolesRepository } from "../repositories/roles-repository.js";
import { UsersRepository } from "../repositories/users-repository.js";
import { HashingService } from "../services/hashing-service.js";
import { TokensService } from "../services/tokens-service.js";
import { RefreshTokensRepository } from "../repositories/refresh-tokens-repository.js";

export class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;

    // User validation
    const user = await UsersRepository.getByEmail(email);
    const { username, password: hashedPassword, id: userId } = user;
    if (!user) next(boom.unauthorized("Invalid email or password"));
    const isUser = await HashingService.compareWithHash(
      password,
      hashedPassword
    );
    if (!isUser) next(boom.unauthorized("Invalid email or password"));

    // User is valid. generate secure auth tokens
    const { expiresAt, refreshToken, hashedRrefreshTk, accessToken } =
      await TokensService.generateForAuth(username, userId, email);

    const rtid = await RefreshTokensRepository.insert(
      user.id,
      hashedRrefreshTk,
      expiresAt
    );

    res
      .cookie("refresh_token", refreshToken, {
        maxAge: expiresAt,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({ accessToken, userId: user.id, email, username });
  }
  static async signup(req, res, next) {
    const { email, password, username } = req.body;

    // creates user

    const hashedPassword = await HashingService.hashString(password);

    const clientRoleId = await RolesRepository.getByName("client");
    if (!clientRoleId)
      next(
        boom.badImplementation(`Role with id = ${clientRoleId} was not found`)
      );

    const userId = await UsersRepository.create(
      username,
      email,
      hashedPassword,
      clientRoleId
    );

    // Generates tokens

    const { expiresAt, refreshToken, hashedRrefreshTk, accessToken } =
      await TokensService.generateForAuth(username, userId, email);

    const rtid = await RefreshTokensRepository.insert(
      userId,
      hashedRrefreshTk,
      expiresAt
    );

    res
      .cookie("refresh_token", refreshToken, {
        maxAge: expiresAt,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({ accessToken, userId, email, username });
  }
  static async verify(req, res, next) {
    return true;
  }
}
