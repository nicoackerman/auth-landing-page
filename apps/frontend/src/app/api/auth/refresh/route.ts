import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET(req: Request) {
  const backendResponse = await fetch(`${API_URL}/auth/refresh`, {
    method: "GET",
    credentials: "include",
    headers: {
      cookie: req.headers.get("cookie") ?? "",
    },
  });

  const data = await backendResponse.json();
  const response = NextResponse.json(data, { status: backendResponse.status });

  const cookies = backendResponse.headers.getSetCookie?.() ?? [];
  for (const cookie of cookies) {
    response.headers.append("set-cookie", cookie);
  }

  return response;
}
