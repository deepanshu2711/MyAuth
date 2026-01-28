import { App } from "../../models/app.model.js";
import { MemberShip } from "../../models/membership.model.js";
import { SignInKey } from "../../models/signingkey.model.js";
import { AppError } from "../../utils/appError.js";
import {
  generateClientId,
  generateClientSecret,
  generateKeyPairSyncForSigningKey,
} from "../../utils/helpers.js";
import * as AppPipeline from "./pipelines/index.js";

export const registerApp = async ({
  name,
  ownerId,
  redirectUris,
}: {
  name: string;
  ownerId: string;
  redirectUris: string[];
}) => {
  const clientId = generateClientId();
  const clientSecret = generateClientSecret();
  const { privateKey, publicKey } = generateKeyPairSyncForSigningKey();

  const signingKey = await SignInKey.create({
    name: `${name} primary key`,
    privateKey,
    publicKey,
    algorithm: "RS256",
    isActive: true,
  });

  const app = await App.create({
    name,
    ownerId,
    redirectUris,
    clientId,
    clientSecret,
    signingKeyId: signingKey._id,
  });
  return { clientId, appId: app._id };
};

export const getUserApps = async ({ userId }: { userId: string }) => {
  console.log("userID", userId);
  const data = await App.aggregate(AppPipeline.getUserApps(userId));
  return data;
};

export const getAppUsers = async ({ appId }: { appId: string }) => {
  const data = await App.aggregate(AppPipeline.getAppUsers(appId));
  return data;
};

export const getSummary = async ({ userId }: { userId: string }) => {
  const data = await App.aggregate(AppPipeline.getUserAppsSummary(userId));
  return data;
};

export const getAppDetails = async ({ appId }: { appId: string }) => {
  const data = await App.aggregate(AppPipeline.getAppDetails(appId));
  return data;
};

export const getAppActiveSessions = async ({ appId }: { appId: string }) => {
  const data = await App.aggregate(AppPipeline.getAppActiveSessions(appId));
  return data;
};

export const getAppSecret = async ({
  appId,
  userId,
}: {
  appId: string;
  userId: string;
}) => {
  const app = await App.findById(appId);
  if (!app) throw new AppError("App not found", 404);

  if (app.ownerId.toString() !== userId)
    throw new AppError("App does not belong to this user", 400);

  return app.clientSecret;
};

export const deleteApp = async ({ appId }: { appId: string }) => {
  const data = await App.findByIdAndDelete(appId);
  await MemberShip.deleteMany({ appId });
  return data;
};
