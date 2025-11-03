"use client";
import { API } from "../apiClient/client";
import { createContext, useContext, useState } from "react";

interface APIContextValue {
  api: API;
}

const APIContext = createContext<APIContextValue | undefined>(undefined);

export function APIClientProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [api] = useState(() => new API());

  const value: APIContextValue = { api };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
}

export function useAPI() {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPI must be used within an APIProvider");
  }
  return context;
}
