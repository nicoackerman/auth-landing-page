"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <h1 className="animate-fade-in-down text-5xl font-bold">
        Welcome to Auth
      </h1>
      <p className="animate-fade-in-up mt-4 text-lg text-gray-400">
        Your secure and simple authentication solution.
      </p>
      <div className="mt-8 space-x-4">
        <Link href="/signup">
          <button className="focus:ring-opacity-50 glassmorphism transform rounded-lg px-6 py-2 font-semibold text-white transition-transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            Sign Up
          </button>
        </Link>
        <Link href="/signup">
          <button>
            Log In
          </button>
        </Link>
      </div>
      <footer className="absolute bottom-4 text-center text-sm text-gray-500">
        <p>
          This is a personal project by nicoackerman. Please use it carefully.
        </p>
      </footer>
    </main>
  );
}
