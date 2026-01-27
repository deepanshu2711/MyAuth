import { rotateToken, verifyToken } from "@myauth/node";
import { NextResponse, type NextRequest } from "next/server.js";
import { config } from "../config.js";

export function withAuthMiddleware(clientId: string) {
  const redirectTo = `${config.authPortalBaseUrl}/login?clientId=${clientId}`;
  const apiBaseUrl = config.apiBaseUrl;

  return async function proxy(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return redirect(req, redirectTo);
    }

    try {
      await verifyToken({ token, apiBaseUrl });
      return NextResponse.next();
    } catch (e: any) {
      console.log("reach this error", e);
      if (e?.response?.data?.code !== "TOKEN_EXPIRED") {
        return redirect(req, redirectTo);
      }
      try {
        const refreshToken = req.cookies.get("refreshToken")?.value;
        if (!refreshToken) return redirect(req, redirectTo);

        const result = await rotateToken({
          token: refreshToken as string,
          apiBaseUrl: config.apiBaseUrl,
        });

        const res = NextResponse.next();

        res.cookies.set("accessToken", result.accessToken, {
          httpOnly: true,
        });
        res.cookies.set("refreshToken", result.refreshToken, {
          httpOnly: true,
        });
        await verifyToken({ token: result.accessToken, apiBaseUrl });
        return res;
      } catch (e) {
        console.log("errror", e);
        return redirect(req, redirectTo);
      }
    }
  };
}

function redirect(req: NextRequest, redirectTo: string) {
  if (redirectTo.startsWith("http")) {
    return NextResponse.redirect(redirectTo);
  }

  return NextResponse.redirect(new URL(redirectTo, req.url));
}
