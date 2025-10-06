export type APIClient = {
  refreshSession<T>(accessToken: string): Promise<T>;
  login<T>(accessToken: string): Promise<T>;
  signup<T>(accessToken: string): Promise<T>;
};

export class API implements APIClient {
  private originUrl: string;

  constructor(originUrl: string) {
    this.originUrl = originUrl;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.originUrl}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    return response.json();
  }

  private async get<T>(accessToken: string, endpoint: string): Promise<T> {
    const response = await this.fetch<T>(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  }
  private async post<T>(
    endpoint: string,
    accessToken: string,
    body: unknown,
  ): Promise<T> {
    const response = await this.fetch<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  }

  async refreshSession<T>(accessToken: string): Promise<T> {
    const response = await this.fetch(accessToken, "/refresh");
    return response;
  }
}
