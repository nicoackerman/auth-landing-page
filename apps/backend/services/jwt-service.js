import "dotenv/config";
import jwt from "jsonwebtoken";

const JWTSecret = process.envJWT_SECRET;
if (!JWTSecret) {
  throw Error("JWT secret was not given");
}

export class HashingService {
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
