import "dotenv/config";
import jwt from "jsonwebtoken";

const JWTSecret = process.env.JWT_SECRET;
if (!JWTSecret) {
  throw Error("JWT secret was not given");
}

export class JWTService {
  static async generateJWT(payload, expires = "1h") {
    const token = jwt.sign(payload, JWTSecret, {
      expiresIn: expires,
    });
    return token;
  }
  static async verifyJWT(token) {
    const payload = jwt.verify(token, JWTSecret);
    return payload;
  }
}
