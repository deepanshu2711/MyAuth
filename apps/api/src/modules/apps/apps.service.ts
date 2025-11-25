import { App } from "../../models/app.model.js";
import { generateClientId, generateClientSecret } from "../../utils/helpers.js";
import * as AppPipeline from "./pipelines/index.js";

export const registerApp = async ({
  name,
  ownerId,
  redirectUris,
}: {
  name: string;
  ownerId: string;
  redirectUris: [string];
}) => {
  const clientId = generateClientId();
  const clientSecret = generateClientSecret();
  const data = await App.create({
    name,
    ownerId,
    redirectUris,
    clientId,
    clientSecret,
  });
  return { clientId, clientSecret };
};

export const getUserApps = async ({ userId }: { userId: string }) => {
  const data = await App.aggregate(AppPipeline.getUserApps(userId));
  return data;
};

export const getAppUsers = async ({ appId }: { appId: string }) => {
  const data = await App.aggregate(AppPipeline.getAppUsers(appId));
  return data;
};
