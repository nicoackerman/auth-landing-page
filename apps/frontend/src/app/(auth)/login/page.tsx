"use client";
import { useLoginForm } from "~/hooks/useLoginForm";

export default function LoginPage() {
  const { result, register, handleSubmit, onSubmit, errors, isSubmitting } =
    useLoginForm();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="animate-fade-in-down glassmorphism w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold">Log In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("email")}
              type="text"
              placeholder="Email"
              className="w-full rounded-md bg-transparent p-2 text-white placeholder:text-gray-400"
            />
            {errors.email && (
              <div className="mt-1 text-red-500">{errors.email.message}</div>
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
          <button
            disabled={isSubmitting}
            type="submit"
            className="rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-500"
          >
            {isSubmitting ? "Loading..." : "Submit"}
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
          Don&apos;t have an account?{" "}
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
