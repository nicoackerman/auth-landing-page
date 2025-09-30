import { RolesRepository } from "../repositories/roles-repository.js";
import { UsersRepository } from "../repositories/users-repository.js";
import { HashingService } from "../services/hashing-service.js";
import { JWTService } from "../services/jwt-service.js";
import { RefreshTokensRepository } from "../repositories/refresh-tokens-repository.js";

export class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
  }
  static async signup(req, res) {
    const { email, password, username } = req.body;

    const accessToken = await JWTService.generateJWT({ email });
    const hashedPassword = await HashingService.hashString(password);
    const clientRoleId = await RolesRepository.getByName("client");
    if (!clientRoleId)
      throw Error(`Role with id = ${clientRoleId} was not found`);
    const userId = await UsersRepository.create(
      username,
      email,
      hashedPassword,
      clientRoleId
    );

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7Days
    const refreshToken = await JWTService.generateJWT(
      {
        email,
        username,
        userId,
      },
      "7Days"
    );
    const hashedRrefreshTk = await HashingService.hashString(refreshToken);
    const rtid = await RefreshTokensRepository.insert(
      userId,
      hashedRrefreshTk,
      expiresAt
    );

    res
      .cookie("refresh_token", hashedRrefreshTk, {
        maxAge: expiresAt,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({ rtid, accessToken, userId, email, username });
  }
  static async verify(req, res) {
    return true;
  }
}
