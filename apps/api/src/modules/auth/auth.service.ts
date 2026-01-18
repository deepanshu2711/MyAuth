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
import { RabbitMQPublisher } from "../../utils/rabbitmq/publisher.js";
import { OAuthClient } from "../../lib/OAuthClient.js";

const publisher = new RabbitMQPublisher();

export const registerUser = async ({
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

  let globalUser = await User.findOne({ email });
  if (!globalUser) {
    globalUser = await User.create({ email });
    await publisher.publishCreateUser({ data: globalUser });
  }

  const existingMembership = await MemberShip.findOne({
    userId: globalUser._id,
    appId: app._id,
  });

  if (existingMembership) {
    if (existingMembership.provider.includes("password"))
      throw new AppError(
        "User with this email already exists in this app",
        400,
      );
    const hashed = await bcrypt.hash(password, 10);
    await MemberShip.updateOne(
      { _id: existingMembership._id },
      {
        $set: { passwordHash: hashed },
        $addToSet: { provider: "password" },
      },
    );
  } else {
    const hashed = await bcrypt.hash(password, 10);
    await MemberShip.create({
      userId: globalUser._id,
      appId: app._id,
      passwordHash: hashed,
      provider: ["password"],
    });
  }

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

  if (!membership.provider.includes("password")) {
    throw new AppError(
      "This account does not use password login. Use Google/GitHub login.",
      400,
    );
  }

  if (!membership.passwordHash) {
    throw new AppError(
      "Password login not available for this account. Use Social Login.",
      400,
    );
  }

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
  if (!authorizationCode || authorizationCode.expiresAt < new Date())
    throw new AppError("Authorization code has expired", 400);

  await AuthorizationCode.findByIdAndDelete(authorizationCode._id);

  const accessToken = await generateAccessToken(
    authorizationCode.userId.toString(),
    clientId,
    String(app.signingKeyId),
  );
  const refreshToken = await generateRefreshToken(
    authorizationCode.userId.toString(),
    clientId,
    String(app.signingKeyId),
  );

  await Session.create({
    userId: authorizationCode.userId,
    accessToken,
    refreshToken,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  });

  return { accessToken, refreshToken };
};

export const refreshToken = async ({
  refreshToken,
  clientId,
}: {
  refreshToken: string;
  clientId: string;
}) => {
  const session = await Session.findOne({ refreshToken });
  if (!session) throw new AppError("Invalid refresh token", 401);

  const app = await App.findOne({ clientId });
  if (!app) throw new AppError("App does not exists", 404);

  session.accessToken = await generateAccessToken(
    session.userId.toString(),
    clientId,
    String(app.signingKeyId),
  );

  session.expiresAt = new Date(Date.now() + 1000 * 60 * 60);
  await session.save();

  return { accessToken: session.accessToken };
};

export const verify = async ({ userId }: { userId: string }) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("user not found", 404);
  return user;
};

export const me = async ({ userId }: { userId: string }) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("user not found", 404);
  return user;
};

export const logout = async ({ refreshToken }: { refreshToken: string }) => {
  const session = await Session.findOneAndDelete({ refreshToken });
  if (!session) throw new AppError("session not found", 404);
  return;
};

export const googleLogin = async (idToken: string, clientId: string) => {
  const app = await App.findOne({ clientId });
  if (!app) throw new AppError("App does not exists", 404);

  const { tokens } = await OAuthClient.getToken({
    code: idToken,
    redirect_uri: "postmessage",
  });

  if (!tokens.id_token) {
    throw new AppError("Google ID token not received", 400);
  }

  const ticket = await OAuthClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID!,
  });
  const OAuthUser = ticket.getPayload();
  if (!OAuthUser)
    throw new AppError("Error While getting User Data from OAuth", 400);

  let globalUser = await User.findOne({ email: OAuthUser.email });
  if (!globalUser) {
    globalUser = await User.create({ email: OAuthUser.email });
    await publisher.publishCreateUser({ data: globalUser });
  }

  const existingMembership = await MemberShip.findOne({
    userId: globalUser._id,
    appId: app._id,
  });

  if (existingMembership) {
    if (!existingMembership.provider.includes("google")) {
      await MemberShip.updateOne(
        { _id: existingMembership._id },
        {
          $addToSet: { provider: "google" },
        },
      );
    }
  } else {
    await MemberShip.create({
      userId: globalUser._id,
      appId: app._id,
      provider: ["google"],
    });
  }

  const code = crypto.randomBytes(32).toString("hex");
  await AuthorizationCode.create({
    code,
    clientId,
    userId: globalUser._id,
    redirectUri: app.redirectUris[0],
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  const redirectUrl = new URL(app.redirectUris[0]!);
  redirectUrl.searchParams.set("code", code);

  return redirectUrl;
};
