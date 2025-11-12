import crypto from "crypto";
import jwt from "jsonwebtoken";

export type AsyncRouteHandler = (...args: any[]) => Promise<any> | any;

export const asyncHandler = (fn: AsyncRouteHandler) => {
  return async function asyncHandled(...args: any[]) {
    const next = args[2];
    try {
      return await fn(...args);
    } catch (error) {
      return next(error);
    }
  };
};

export function generateClientId(prefix = "app_") {
  return prefix + crypto.randomBytes(12).toString("base64url");
}

export function generateClientSecret(prefix = "sh_") {
  return prefix + crypto.randomBytes(32).toString("base64url");
}

export const generateAccessToken = (userId: string, appId: string) => {
  return jwt.sign({ userId, appId }, "access-token-secret", {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string, appId: string) => {
  return jwt.sign({ userId, appId }, "refresh-token-secret", {
    expiresIn: "7d",
  });
};
