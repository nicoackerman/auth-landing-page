import bcrypt from "bcrypt";

export class HashingService {
  static async hashString(string) {
    const hash = await bcrypt.hash(string, 13);
    return hash;
  }
  static async compareWithHash(string, hash) {
    const isMatch = await bcrypt.compare(string, hash);
    return isMatch;
  }
}
