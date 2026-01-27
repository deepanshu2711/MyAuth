import { getCurrentuser } from "@myauth/node";
import { cookies, headers } from "next/headers.js";
import { config } from "../config.js";

export const currentUser = async () => {
  const cookieStore = await cookies();
  const headerList = await headers();

  const token =
    cookieStore.get("accessToken")?.value ??
    headerList.get("authorization")?.replace("Bearer ", "");

  if (!token) return null;

  try {
    const user = await getCurrentuser({ token, apiBaseUrl: config.apiBaseUrl });
    return user;
  } catch (e) {
    console.log("error in get current user", e);
    return null;
  }
};
