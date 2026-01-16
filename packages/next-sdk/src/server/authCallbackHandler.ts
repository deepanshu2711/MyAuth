import { MyAuth } from "@myauth/node";
import { NextResponse, type NextRequest } from "next/server.js";

export function createAuthCallbackHandler(config: {
  clientId: string;
  clientSecret: string;
}) {
  //  const API_BASE_URL = "http://localhost:5005";
  const API_BASE_URL = "https://auth-api.deepxdev.com";

  const myAuth = new MyAuth({
    ...config,
    apiBaseUrl: API_BASE_URL,
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

      return res;
    } catch {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
  };
}
