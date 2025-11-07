import crypto from "crypto";

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

export function generateAccessToken(prefix = "atk_") {
  return prefix + crypto.randomBytes(32).toString("base64url");
}

export function generateRefreshToken(prefix = "rtk_") {
  return prefix + crypto.randomBytes(64).toString("base64url");
}
