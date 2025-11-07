import bcrypt from "bcryptjs";
import crypto from "crypto";

import { AppError } from "../../utils/appError.js";
import { User } from "../../models/user.model.js";
import { Session } from "../../models/session.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/helpers.js";
import { App } from "../../models/app.model.js";
import { MemberShip } from "../../models/membership.model.js";
import { AuthorizationCode } from "../../models/authorizationCode.model.js";

export const registerUser = async ({
  email,
  password,
  clientId,
}: {
  email: string;
  password: string;
  clientId: string;
}) => {
  const app = await App.findOne({ clientId });
  if (!app) throw new AppError("App does not exists", 404);

  const hashed = await bcrypt.hash(password, 10);

  let globalUser = await User.findOne({ email });
  if (!globalUser) {
    globalUser = await User.create({ email });
  }

  const existingMembership = await MemberShip.findOne({
    userId: globalUser._id,
    appId: app._id,
  });

  if (existingMembership) {
    throw new AppError("User with this email already exists in this app", 400);
  }

  await MemberShip.create({
    userId: globalUser._id,
    appId: app._id,
    passwordHash: hashed,
  });

  const accessToken = generateAccessToken();

  const refreshToken = generateRefreshToken();

  await Session.create({
    userId: globalUser._id,
    accessToken,
    refreshToken,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  });

  return { accessToken, refreshToken };
};

export const loginUser = async ({
  email,
  password,
  clientId,
  redirect_uri,
}: {
  email: string;
  password: string;
  clientId: string;
  redirect_uri: string;
}) => {
  const app = await App.findOne({ clientId });
  if (!app) throw new AppError("App does not exists", 404);

  const globalUser = await User.findOne({ email });
  if (!globalUser) throw new AppError("Invalid email or password", 401);

  const membership = await MemberShip.findOne({
    userId: globalUser._id,
    appId: app._id,
  });
  if (!membership) throw new AppError("User not found in this app", 401);

  const validPassword = await bcrypt.compare(password, membership.passwordHash);
  if (!validPassword) throw new AppError("Invalid email or password", 401);

  //NOTE: insted of creating a session generate a code and redirect user to redirected uri and that code in query params
  const code = crypto.randomBytes(32).toString("hex");
  await AuthorizationCode.create({
    code,
    clientId,
    userId: globalUser._id,
    redirectUri: redirect_uri,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  const redirectUrl = new URL(redirect_uri);
  redirectUrl.searchParams.set("code", code);

  return redirectUrl;
};

export const getTokens = async ({
  clientId,
  clientSecret,
  code,
}: {
  clientId: string;
  clientSecret: string;
  code: string;
}) => {
  const app = await App.findOne({ clientId, clientSecret });
  if (!app) throw new AppError("App does not exists", 404);

  const authorizationCode = await AuthorizationCode.findOne({ code, clientId });
  if (!authorizationCode || authorizationCode.expiresAt > new Date())
    throw new AppError("Authorization code has expired", 400);

  await AuthorizationCode.findByIdAndDelete(authorizationCode._id);

  const accessToken = generateAccessToken();
  const refreshToken = generateRefreshToken();

  await Session.create({
    userId: authorizationCode.userId,
    accessToken,
    refreshToken,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  });
};

export const refreshToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const session = await Session.findOne({ refreshToken });
  if (!session) throw new AppError("Invalid refresh token", 401);

  session.accessToken = generateAccessToken();
  session.expiresAt = new Date(Date.now() + 1000 * 60 * 60);
  await session.save();

  return { accessToken: session.accessToken };
};
