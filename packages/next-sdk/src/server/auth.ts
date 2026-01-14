import { verifyToken } from "@myauth/node";
import { cookies, headers } from "next/headers.js";

export const auth = async () => {
  const cookieStore = await cookies();
  const headerList = await headers();

  const token =
    cookieStore.get("refreshToken")?.value ??
    headerList.get("authorization")?.replace("Bearer ", "");

  if (!token) return null;
  const session = await verifyToken({
    token,
    apiBaseUrl: "http://localhost:5005",
  });

  return session;
};
