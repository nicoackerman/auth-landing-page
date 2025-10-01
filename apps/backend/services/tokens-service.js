import { JWTService } from "./jwt-service.js";
import { HashingService } from "./hashing-service.js";

export class TokensService {
  static async generateForAuth(username, userId, email) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7Days

    const accessToken = await JWTService.generateJWT({ email });
    const refreshToken = await JWTService.generateJWT(
      { username, userId, email },
      "7Days"
    );
    
    const hashedRrefreshTk = await HashingService.hashString(refreshToken);
    return { expiresAt, refreshToken, hashedRrefreshTk, accessToken };
  }
}
