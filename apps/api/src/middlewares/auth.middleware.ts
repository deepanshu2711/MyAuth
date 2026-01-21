import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/responses.js";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { Session } from "../models/session.model.js";
import { AppError } from "../utils/appError.js";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; appId: string };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token: string | undefined;
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const activeSession = await Session.findOne({
      accessToken: token,
      expiresAt: {
        $gt: new Date(),
      },
    });
    if (!activeSession) throw new AppError("Expired Session", 401);

    // Verify JWT using JWKS
    const JWKS = createRemoteJWKSet(
      new URL("https://auth-api.deepxdev.com/.well-known/jwks.json"),
    );
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: "https://auth.deepxdev.com",
    });

    req.user = {
      userId: payload.userId as string,
      appId: payload.appId as string,
    };
    next();
  } catch (err: any) {
    if (err.code === "ERR_JWT_EXPIRED") {
      return res.status(401).json({ code: "TOKEN_EXPIRED" });
    }
    return errorResponse(res, "Unauthorized", 401);
  }
};
