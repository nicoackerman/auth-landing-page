import { JWTService } from "./jwt-service.js";
import { HashingService } from "./hashing-service.js";

export class TokensService {
  static async generateForAuth(username, userId, email) {
    const rtExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7Days
    const atExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5Minutes

    const accessToken = await JWTService.generateJWT({ email }, "5Minutes");
    const refreshToken = await JWTService.generateJWT(
      { username, userId, email },
      "7Days"
    );

    const hashedRrefreshTk = await HashingService.hashString(refreshToken);
    return {
      rtExpiresAt,
      refreshToken,
      hashedRrefreshTk,
      accessToken,
      atExpiresAt,
    };
  }
}
