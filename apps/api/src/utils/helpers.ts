import crypto, { generateKeyPairSync } from "crypto";
import jwt from "jsonwebtoken";
import { SignInKey } from "../models/signingkey.model.js";

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

export const generateAccessToken = async (
  userId: string,
  appId: string,
  signingKeyId: string,
) => {
  const signingKey = await SignInKey.findById(signingKeyId);
  if (!signingKey || !signingKey.isActive) {
    throw new Error("Invalid signing key");
  }
  return jwt.sign({ userId, appId }, signingKey.privateKey, {
    algorithm: "RS256",
    expiresIn: "15m",
    issuer: "https://auth.deepxdev.com",
    keyid: signingKey._id.toString(),
  });
};

export const generateRefreshToken = async (
  userId: string,
  appId: string,
  signingKeyId: string,
) => {
  const signingKey = await SignInKey.findById(signingKeyId);
  if (!signingKey || !signingKey.isActive) {
    throw new Error("Invalid signing key");
  }

  return jwt.sign({ userId, appId }, signingKey.privateKey, {
    algorithm: "RS256",
    expiresIn: "7d",
    issuer: "https://auth.deepxdev.com",
    keyid: signingKey._id.toString(),
  });
};

export const generateKeyPairSyncForSigningKey = () => {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });

  return { privateKey, publicKey };
};
