"use client";

import React, { createContext, useEffect, useState } from "react";
import type { AuthState, Session, User } from "../types.js";
import { logOut } from "@myauth/node";
import { useRouter } from "next/navigation.js";
import { setSessionToken } from "../internal/session.js";
import { config } from "../config.js";

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({
  children,
  initialSession,
  clientId,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
  clientId: string;
}) {
  const [user, setUser] = useState<User | null>(initialSession?.user || null);
  const [token, setToken] = useState<string | null>(
    initialSession?.token || null,
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      setLoading(true);

      if (token) {
        await logOut({
          token,
          apiBaseUrl: config.apiBaseUrl,
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
    router.push(`${config.authPortalBaseUrl}?clientId=${clientId}`);
    return;
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}
