import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

interface AuthUser {
  email: string;
  appName: string;
  apiKey: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  signup: (appName: string, email: string) => string;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Fake key generator for demo purposes
const generateFakeKey = (prefix: "live" | "test") =>
  `sk_${prefix}_` +
  Array.from({ length: 32 }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[
      Math.floor(Math.random() * 62)
    ]
  ).join("");

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    // Persist across hot-reloads in dev
    const stored = sessionStorage.getItem("arafi_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((email: string) => {
    const newUser: AuthUser = {
      email,
      appName: "Production",
      apiKey: generateFakeKey("live"),
    };
    sessionStorage.setItem("arafi_user", JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const signup = useCallback((appName: string, email: string): string => {
    const apiKey = generateFakeKey("live");
    const newUser: AuthUser = { email, appName, apiKey };
    sessionStorage.setItem("arafi_user", JSON.stringify(newUser));
    setUser(newUser);
    return apiKey;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("arafi_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
