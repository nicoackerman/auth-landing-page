"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAPI } from "./APIClientProvider";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "~/lib/cookie-handler";

interface AuthContextValue {}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthClientProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [_user, setUser] = useState(null);
  const [_loading, setLoading] = useState(true);

  const { api } = useAPI();

  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");

  const { data, isLoading } = useQuery({
    queryFn: () => api.refreshSession(),
    queryKey: ["user_session"],
    enabled: Boolean(
      (refreshToken && accessToken) || (refreshToken && !accessToken),
    ),
  });

  useEffect(() => {
    if (!isLoading) {
      setUser(data ?? null);
      setLoading(false);
    }
  }, [data, isLoading]);

  return (
    <AuthContext.Provider value={{ user: _user, isLoading: _loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
