"use client";

import React, { createContext, useState } from "react";
import type { AuthState, User } from "../types.js";

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

  return (
    <AuthContext.Provider value={{ user, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
}
