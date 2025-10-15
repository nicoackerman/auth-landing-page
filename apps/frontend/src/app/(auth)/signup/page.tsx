"use client";

import { useActionState } from "react";
import { submitSignUp } from "~/actions/submitSignUp";
import type { SignUpActionResponse } from "~/types/actionsResponses";

const initialState: SignUpActionResponse = {
  success: false,
  message: "",
};

export default function SignupPage() {
  const [state, action, isPending] = useActionState(submitSignUp, initialState);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="animate-fade-in-down glassmorphism w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold">Sign up</h1>
        <form action={action} autoComplete="on" className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-400"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              aria-describedby="username-error"
              className={
                state?.errors?.username
                  ? "border-red-500"
                  : "mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              }
            />
            {state?.errors?.username && (
              <p id="username-error" className="text-sm text-red-500">
                {state.errors.username[0]}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-describedby="email-error"
              className={
                state?.errors?.email
                  ? "mt-1 w-full rounded-md border border-red-500 bg-transparent px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  : "mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              }
            />
            {state?.errors?.email && (
              <p id="email-error" className="text-sm text-red-500">
                {state.errors.email[0]}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              required
              aria-describedby="password-error"
              className={
                state?.errors?.password
                  ? "mt-1 w-full rounded-md border border-red-500 bg-transparent px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  : "mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              }
            />
            {state?.errors?.password && (
              <p id="password-error" className="text-sm text-red-500">
                {state.errors.password[0]}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="confirmPassword"
              required
              aria-describedby="confirmPassword-error"
              className={
                state?.errors?.confirmPassword
                  ? "mt-1 w-full rounded-md border border-red-500 bg-transparent px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  : "mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              }
            />
            {state?.errors?.confirmPassword && (
              <p id="confirmPassword-error" className="text-sm text-red-500">
                {state.errors.confirmPassword[0]}
              </p>
            )}
          </div>
          <div>
            {state?.message && (
              <div>
                <div>{state.success ? "Success" : "Error"}</div>
                <div>{state.message}</div>
              </div>
            )}
          </div>
          <div>
            <button
              disabled={isPending}
              type="submit"
              className={
                "mt-1 w-full cursor-pointer rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              }
            >
              {isPending ? "Saving..." : "Login"}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-blue-500 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
