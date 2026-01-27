import { verifyToken } from "@myauth/node";
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
  } catch (err) {
    console.log("érror in auth", err);
    return null;
  }
};
