// =============================================
// /context/AuthProvider.tsx
// =============================================
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = { id: string; email: string; name?: string } | null;

type AuthContextType = {
  user: User;
  token: string | null;
  setAuth: (u: User, t: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("auth_token");
    const u = localStorage.getItem("auth_user");
    if (t && u) {
      setToken(t);
      try { setUser(JSON.parse(u)); } catch {}
    }
  }, []);

  const setAuth = (u: User, t: string) => {
    setUser(u);
    setToken(t);
    localStorage.setItem("auth_token", t);
    localStorage.setItem("auth_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}