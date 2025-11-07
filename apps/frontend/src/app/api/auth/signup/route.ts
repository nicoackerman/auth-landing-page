import { NextResponse } from "next/server";
import type { SignUpInput } from "~/interface-adapters/dtos/signup-input.dto.ts";
import type { User } from "~/interface-adapters/dtos/user.dto";

export type ResData = {
  id: User["id"];
  email: User["email"];
  username: User["username"];
  role: User["role"];
};

export async function POST(req: Request) {
  const body = (await req.json()) as SignUpInput;

  const res = await fetch(`${process.env.API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = (await res.json()) as ResData;
  const response = NextResponse.json(data, { status: res.status });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
