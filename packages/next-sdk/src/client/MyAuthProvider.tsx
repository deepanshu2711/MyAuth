"use client";

import React, { createContext, useEffect, useState } from "react";
import type { AuthState, Session, User } from "../types.js";
import { logOut } from "@myauth/node";
import { useRouter } from "next/navigation.js";
import { setSessionToken } from "../internal/session.js";

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({
  children,
  initialSession,
  clientId,
}: {
  children: React.ReactNode;
  initialSession: Session;
  clientId: string;
}) {
  console.log(initialSession);
  const [user, setUser] = useState<User | null>(initialSession?.user);
  const [token, setToken] = useState<string | null>(initialSession?.token);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const API_BASE_URL = "http://localhost:5005";
  // const API_BASE_URL = "https://auth-api.deepxdev.com";

  const logout = async () => {
    try {
      setLoading(true);

      if (token) {
        await logOut({
          token,
          apiBaseUrl: API_BASE_URL,
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

  useEffect(() => {
    setSessionToken(token ?? null);
  }, [token]);

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
