"use client";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg animate-fade-in-down glassmorphism">
        <h1 className="text-3xl font-bold text-center">Log In</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 mt-1 text-white bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 mt-1 text-white bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-105 transition-transform"
            >
              Log In
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
