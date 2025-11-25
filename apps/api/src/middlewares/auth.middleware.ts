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
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const activeSession = await Session.findOne({
      refreshToken,
      expiresAt: {
        $gt: new Date(),
      },
    });
    if (!activeSession) throw new AppError("Expired Session", 401);

    const decoded = jwt.verify(refreshToken, "refresh-token-secret") as {
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
