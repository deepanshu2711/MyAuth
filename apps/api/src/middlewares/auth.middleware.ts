import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/responses.js";
import jwt from "jsonwebtoken";
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
    if (req.cookies?.refreshToken) {
      token = req.cookies.refreshToken;
    }
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const activeSession = await Session.findOne({
      refreshToken: token,
      expiresAt: {
        $gt: new Date(),
      },
    });
    if (!activeSession) throw new AppError("Expired Session", 401);

    const decoded = jwt.verify(token, "refresh-token-secret") as {
      userId: string;
      appId: string;
    };

    req.user = { userId: decoded.userId, appId: decoded.appId };
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return errorResponse(res, "Unauthorized", 401);
  }
};
