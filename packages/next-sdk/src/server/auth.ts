import { rotateToken, verifyToken } from "@myauth/node";
import { cookies, headers } from "next/headers.js";
import { config } from "../config.js";
import type { Session, User } from "../types.js";

export const auth = async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const headerList = await headers();

  const token =
    cookieStore.get("accessToken")?.value ??
    headerList.get("authorization")?.replace("Bearer ", "");

  if (!token) return null;

  try {
    const user: User | null = await verifyToken({
      token,
      apiBaseUrl: config.apiBaseUrl,
    });

    return { user, token };
  } catch (e: any) {
    if (e?.response?.data?.code !== "TOKEN_EXPIRED") {
      return null;
    }
    try {
      const refreshToken = cookieStore.get("refreshToken")?.value;
      if (!refreshToken) return null;

      const result = await rotateToken({
        token: refreshToken as string,
        apiBaseUrl: config.apiBaseUrl,
      });

      cookieStore.set("accessToken", result.accessToken, { httpOnly: true });
      cookieStore.set("refreshToken", result.refreshToken, { httpOnly: true });

      const user: User | null = await verifyToken({
        token: result.accessToken,
        apiBaseUrl: config.apiBaseUrl,
      });

      return { user, token: result.accessToken };
    } catch (err) {}
    console.log("errror", e);
    return null;
  }
};
