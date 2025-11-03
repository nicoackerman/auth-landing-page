import type { User, UserEmail, Username, UserPassword } from "~/types/user";
// import type { BoomError } from "./types";

export const API_URL = process.env.API_URL;

export class API {
  private static async fetch<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = (await response.json()) as T;
    return data;
  }

  private static async get<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint, { method: "GET" });
  }

  private static async post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  static async refreshSession(): Promise<void> {
    await this.get("/refresh");
  }

  static async login(
    username: Username,
    password: UserPassword,
  ): Promise<User> {
    const data: User = await this.post("auth/login", { username, password });
    return data;
  }

  // static async signup(
  //   email: UserEmail,
  //   username: Username,
  //   password: UserPassword,
  // ): Promise<User> {
  //   const data: User | BoomError = await this.post("auth/signup", {
  //     email,
  //     username,
  //     password,
  //   });

  //   if (data.isBoom) {
  //     thr
  //   }
  //   return data;
  // }
}
