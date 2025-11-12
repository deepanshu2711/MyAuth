import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken");
  if (!refreshToken) {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
    const redirectUri = encodeURIComponent("http://localhost:3000/callback");
    return NextResponse.redirect(
      `http://localhost:3001/login?clientId=${clientId}&redirect_uri=${redirectUri}`,
    );
  }

  try {
    const verifyResponse = await fetch(
      "http://localhost:5005/api/auth/verify",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refreshToken=${refreshToken.value}`,
        },
        credentials: "include",
      },
    );

    if (!verifyResponse.ok) {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
      const redirectUri = encodeURIComponent("http://localhost:3000/callback");
      return NextResponse.redirect(
        `http://localhost:3001/login?clientId=${clientId}&redirect_uri=${redirectUri}`,
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Verification failed:", error);
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
    const redirectUri = encodeURIComponent("http://localhost:3000/callback");
    return NextResponse.redirect(
      `http://localhost:3001/login?clientId=${clientId}&redirect_uri=${redirectUri}`,
    );
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
