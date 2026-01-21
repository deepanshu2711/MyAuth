import { verifyToken } from "@myauth/node";
import { NextResponse, type NextRequest } from "next/server.js";

export function withAuthMiddleware(clientId: String) {
  const AUTH_PORTAL_BASE_URL = "http://localhost:3001";
  //const AUTH_PORTAL_BASE_URL = "https://auth.deepxdev.com";
  //const API_BASE_URL = "https://auth-api.deepxdev.com";
  const API_BASE_URL = "http://localhost:5005";

  const redirectTo = `${AUTH_PORTAL_BASE_URL}/login?clientId=${clientId}`;
  const apiBaseUrl = API_BASE_URL;

  return async function proxy(req: NextRequest) {
    const token = req.cookies.get("refreshToken")?.value;
    console.log("token", token);
    if (!token) {
      return redirect(req, redirectTo);
    }

    try {
      await verifyToken({ token, apiBaseUrl });
      return NextResponse.next();
    } catch (e) {
      console.log("reach this error", e);
      return redirect(req, redirectTo);
    }
  };
}

function redirect(req: NextRequest, redirectTo: string) {
  if (redirectTo.startsWith("http")) {
    return NextResponse.redirect(redirectTo);
  }

  return NextResponse.redirect(new URL(redirectTo, req.url));
}
