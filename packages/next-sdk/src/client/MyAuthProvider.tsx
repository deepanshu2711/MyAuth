"use client";

import React, { createContext, useState } from "react";
import type { AuthState, User } from "../types.js";
import { logOut } from "@myauth/node";
import { useRouter } from "next/navigation.js";

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({
  children,
  initialSession,
  clientId,
}: {
  children: React.ReactNode;
  initialSession: User;
  clientId: string;
}) {
  const [user, setUser] = useState<User | null>(initialSession);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const login = async () => {
    if (user && token) return;
    router.push(
      `${process.env.NEXT_PUBLIC_AUTH_FRONTEND}?clientId=${clientId}`,
    );
    return;
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}
