import type { User, UserEmail, Username, UserPassword } from "~/types/user";

export class API {
  private originUrl: string;

  constructor(originUrl: string) {
    this.originUrl = originUrl;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.originUrl}${endpoint}`, {
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

  private async get<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint, { method: "GET" });
  }

  private async post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async refreshSession(): Promise<void> {
    await this.get("/refresh");
  }

  async login(username: Username, password: UserPassword): Promise<User> {
    const data: User = await this.post("/login", { username, password });
    return data;
  }

  async signup(
    email: UserEmail,
    username: Username,
    password: UserPassword,
  ): Promise<User> {
    const data: User = await this.post("/signup", {
      email,
      username,
      password,
    });
    return data;
  }
}
