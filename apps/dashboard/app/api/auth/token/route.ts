import { MyAuth } from "@myauth/sdk";
import { NextRequest, NextResponse } from "next/server";

const myAuth = new MyAuth({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  apiBaseUrl: process.env.AUTH_BACKEND!, //will be removed later
});

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  if (!code)
    return NextResponse.json({ error: "Code required" }, { status: 400 });
  try {
    const { refreshToken, accessToken } = await myAuth.handleCallback(code);
    const response = NextResponse.json({ accessToken });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }
}
