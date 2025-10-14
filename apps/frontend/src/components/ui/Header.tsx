import { Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="glassmorphism flex items-center justify-between p-4">
      <div className="flex items-center">
        <Shield className="mr-2 h-8 w-8" />
        <span className="text-xl font-bold">Auth</span>
      </div>
      <nav className="space-x-4">
        <a href="/" className="hover:text-gray-400">
          Home
        </a>
        <a href="/dashboard" className="hover:text-gray-400">
          Dashboard
        </a>
        <a href="/login" className="hover:text-gray-400">
          Login
        </a>
        <a href="/signup" className="hover:text-gray-400">
          Sign Up
        </a>
      </nav>
    </header>
  );
}
