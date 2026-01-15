import { verifyToken } from "@myauth/node";
import { NextResponse, type NextRequest } from "next/server.js";

export function withAuthMiddleware(clientId: String) {
  const redirectTo = `${process.env.AUTH_PORTAL_BASE_URL}?clientId=${clientId}`;
  const apiBaseUrl = process.env.API_BASE_URL!;

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
      console.log("reach this error");
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
