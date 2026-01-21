import { verifyToken } from "@myauth/node";
import { cookies, headers } from "next/headers.js";

export const auth = async () => {
  const cookieStore = await cookies();
  const headerList = await headers();
  const API_BASE_URL = "http://localhost:5005";
  // const API_BASE_URL = "https://auth-api.deepxdev.com";

  const token =
    cookieStore.get("accessToken")?.value ??
    headerList.get("authorization")?.replace("Bearer ", "");

  if (!token) return null;

  try {
    const user = await verifyToken({
      token,
      apiBaseUrl: API_BASE_URL,
    });

    return { user, token };
  } catch (err: any) {
    if (err.response.data.code !== "TOKEN_EXPIRED") return null;
  }
};
