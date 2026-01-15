"use client";

import React, { createContext, useState } from "react";
import type { AuthState, User } from "../types.js";
import { logOut } from "@myauth/node";

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: User;
}) {
  const [user, setUser] = useState<User | null>(initialSession);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);

      if (token) {
        await logOut({
          token,
          apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
        });
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      setToken(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
