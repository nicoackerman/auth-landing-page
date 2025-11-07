"use client";

import { useSignUpForm } from "~/app/(auth)/_hooks/useSignUpForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const { result, register, handleSubmit, onSubmit, errors, isSubmitting } =
    useSignUpForm();

  useEffect(() => {
    if (!result?.success) return;

    const timer = setTimeout(() => {
      router.replace("/dashboard");
    }, 1500);

    return () => clearTimeout(timer);
  }, [result, router]);

  const authenticated = result?.success;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="animate-fade-in-down glassmorphism w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full rounded-md bg-transparent p-2 text-white placeholder:text-gray-400"
            />
            {errors.email && (
              <div className="mt-1 text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div>
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              className="w-full rounded-md bg-transparent p-2 text-white placeholder:text-gray-400"
            />
            {errors.username && (
              <div className="mt-1 text-red-500">{errors.username.message}</div>
            )}
          </div>
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full rounded-md bg-transparent p-2 text-white placeholder:text-gray-400"
            />
            {errors.password && (
              <div className="mt-1 text-red-500">{errors.password.message}</div>
            )}
          </div>
          <div>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Password"
              className="w-full rounded-md bg-transparent p-2 text-white placeholder:text-gray-400"
            />
            {errors.confirmPassword && (
              <div className="mt-1 text-red-500">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <button
            disabled={isSubmitting || authenticated}
            type="submit"
            className="rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-500"
          >
            {isSubmitting || authenticated ? "Loading..." : "Submit"}
          </button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
          {result && result.success && (
            <div className="text-blue-500">{result.message}</div>
          )}
          {result && !result.success && (
            <div className="text-red-500">{result.message}</div>
          )}
        </form>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-blue-500 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
