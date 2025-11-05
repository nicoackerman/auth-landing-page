import { NextResponse } from "next/server";
import type {
  UserEmail,
  UserId,
  Username,
  UserRole,
} from "~/entities/models/user";

export type ResData = {
  id: UserId;
  email: UserEmail;
  username: Username;
  role: UserRole;
};

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
