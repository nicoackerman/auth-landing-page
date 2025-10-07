export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "client" | "admin";
};

export type Username = User["username"];
export type UserEmail = User["email"];
export type UserPassword = User["password"];
export type UserRole = User["role"];
