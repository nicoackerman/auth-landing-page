import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscore"),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
      "Password must include lowercase, UPPERCASE, number, and symbol",
    ),
  role: z.enum(["client", "admin"]),
  createdAt: z.coerce.date(),
});