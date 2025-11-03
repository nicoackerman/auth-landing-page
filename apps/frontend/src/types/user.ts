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

export const SignUpSchema = z
  .object({
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
    confirmPassword: z
      .string()
      .min(8)
      .max(128)
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
        "Password must include lowercase, UPPERCASE, number, and symbol",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });

export const LogInSchema = UserSchema.pick({
  email: true,
  password: true,
});

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "client" | "admin";
};

export type Username = User["username"];
export type UserId = User["id"];
export type UserEmail = User["email"];
export type UserPassword = User["password"];
export type UserRole = User["role"];
