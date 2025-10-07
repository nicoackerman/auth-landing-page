import boom from "@hapi/boom";
import { RolesRepository } from "../repositories/roles-repository.js";
import { UsersRepository } from "../repositories/users-repository.js";
import { HashingService } from "../services/hashing-service.js";
import { TokensService } from "../services/tokens-service.js";
import { RefreshTokensRepository } from "../repositories/refresh-tokens-repository.js";

export class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;

    const user = await UsersRepository.getByEmail(email);

    if (!user) next(boom.unauthorized("Invalid email or password"));

    const {
      username,
      password: hashedPassword,
      id: userId,
      role_id: roleId,
    } = user;

    const userRole = await RolesRepository.getById(roleId);

    const isUser = await HashingService.compareWithHash(
      password,
      hashedPassword
    );

    if (!isUser) next(boom.unauthorized("Invalid email or password"));

    const {
      rtExpiresAt,
      atExpiresAt,
      refreshToken,
      hashedRrefreshTk,
      accessToken,
    } = await TokensService.generateForAuth(username, userId, email);

    const rtid = await RefreshTokensRepository.insert(
      user.id,
      hashedRrefreshTk,
      rtExpiresAt
    );

    res
      .cookie("refresh_token", refreshToken, {
        maxAge: rtExpiresAt,
        httpOnly: true,
        // secure: true,
        // sameSite: "strict",
      })
      .cookie("access_token", accessToken, {
        maxAge: atExpiresAt,
        httpOnly: false,
        // secure: true,
        // sameSite: "strict",
      })
      .json({ id: user.id, email, username, role: userRole });
  }
  static async signup(req, res, next) {
    const { email, password, username } = req.body;

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

    const {
      rtExpiresAt,
      atExpiresAt,
      refreshToken,
      hashedRrefreshTk,
      accessToken,
    } = await TokensService.generateForAuth(username, userId, email);

    const rtid = await RefreshTokensRepository.insert(
      userId,
      hashedRrefreshTk,
      rtExpiresAt
    );

    res
      .cookie("refresh_token", refreshToken, {
        maxAge: rtExpiresAt,
        httpOnly: true,
        // secure: true,
        // sameSite: "strict",
      })
      .cookie("access_token", accessToken, {
        maxAge: atExpiresAt,
        httpOnly: false,
        // secure: true,
        // sameSite: "strict",
      })
      .json({ id: userId, email, username, role: "client" });
  }
  static async refresh(req, res, next) {
    const decoded = jwt.decode(req.cookie.refresh_token);
    const { username, userId, email } = decoded;
    const {
      rtExpiresAt,
      atExpiresAt,
      refreshToken,
      hashedRrefreshTk,
      accessToken,
    } = await TokensService.generateForAuth(username, userId, email);

    const isValid = await RefreshTokensRepository.isValid(
      req.cookie.refresh_token
    );
    if (!isValid) {
      next(boom.unauthorized(`Refresh Token is invalid`));
    }

    const rtid = await RefreshTokensRepository.insert(
      userId,
      hashedRrefreshTk,
      rtExpiresAt
    );
    res
      .cookie("refresh_token", refreshToken, {
        maxAge: rtExpiresAt,
        httpOnly: true,
        // secure: true,
        // sameSite: "strict",
      })
      .cookie("access_token", accessToken, {
        maxAge: atExpiresAt,
        httpOnly: false,
        // secure: true,
        // sameSite: "strict",
      })
      .json({ id: userId, email, username, role: "client" });
  }
}
