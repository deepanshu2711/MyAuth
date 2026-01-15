import { withAuthMiddleware } from "@myauth/next";
import { NextRequest } from "next/server";

export default withAuthMiddleware(process.env.NEXT_PUBLIC_CLIENT_ID!);

export const config = {
  matcher: ["/dashboard/:path*"],
};
