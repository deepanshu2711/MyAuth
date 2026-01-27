import { MyAuth } from "@myauth/node";
import { NextResponse, type NextRequest } from "next/server.js";
import { config } from "../config.js";

export function createAuthCallbackHandler(handlerConfig: {
  clientId: string;
  clientSecret: string;
}) {
  const myAuth = new MyAuth({
    ...handlerConfig,
    apiBaseUrl: config.apiBaseUrl,
  });

  return async function POST(req: NextRequest) {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code required" }, { status: 400 });
    }

    try {
      const { refreshToken, accessToken } = await myAuth.handleCallback(code);

      const res = NextResponse.json({ accessToken });

      res.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });

      res.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });

      return res;
    } catch {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
  };
}
