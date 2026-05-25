import { App } from "../../models/app.model.js";
import { WebHook } from "../../models/webhook.model.js";
import { AppError } from "../../utils/appError.js";
import { generateWebhookSecret } from "../../utils/webhook.js";

export const getWebhookByAppId = async ({
  appId,
  userId,
}: {
  appId: string;
  userId: string;
}) => {
  const existingApp = await App.findOne({ _id: appId, ownerId: userId });
  if (!existingApp) throw new AppError("Application not found.", 404);

  const webhooks = await WebHook.find({ appId });
  return webhooks;
};

export const create = async ({
  appId,
  name,
  url,
  events,
}: {
  appId: string;
  name: string;
  url: string;
  events: ("user.created" | "user.updated" | "user.deleted")[];
}) => {
  const existingWebhook = await WebHook.findOne({ appId, url });
  if (existingWebhook) throw new AppError("Webhook already exists.", 400);

  const secret = generateWebhookSecret();
  const webhook = await WebHook.create({ name, appId, url, events, secret });

  return webhook;
};

export const update = async ({
  id,
  userId,
  name,
  url,
  events,
  isActive,
}: {
  id: string;
  userId: string;
  name?: string;
  url?: string;
  events?: ("user.created" | "user.updated" | "user.deleted")[];
  isActive?: boolean;
}) => {
  const webhook = await WebHook.findById(id);
  if (!webhook) throw new AppError("Webhook not found.", 404);

  const existingApp = await App.findOne({
    _id: webhook.appId,
    ownerId: userId,
  });
  if (!existingApp) throw new AppError("Application not found.", 404);

  if (name !== undefined) webhook.name = name;
  if (url !== undefined) webhook.url = url;
  if (events !== undefined) webhook.events = events;
  if (isActive !== undefined) webhook.isActive = isActive;

  await webhook.save();
  return webhook;
};

export const deleteWebhook = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const webhook = await WebHook.findById(id);
  if (!webhook) throw new AppError("Webhook not found.", 404);

  const existingApp = await App.findOne({
    _id: webhook.appId,
    ownerId: userId,
  });
  if (!existingApp) throw new AppError("Application not found.", 404);

  await WebHook.findByIdAndDelete(id);
  return webhook;
};
