import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/helpers.js";
import * as WebHookService from "./webhooks.service.js";
import { successResponse } from "../../utils/responses.js";

export const getAppWebhooks = asyncHandler(
  async (req: Request, res: Response) => {
    const { appId } = req.params;
    const userId = req?.user?.userId;

    const data = await WebHookService.getWebhookByAppId({
      appId: appId!,
      userId: userId!,
    });
    return successResponse(res, data);
  },
);

export const createWebhook = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, url, appId, events } = req.body;
    const data = await WebHookService.create({ name, url, events, appId });
    return successResponse(res, data);
  },
);

export const updateWebhook = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req?.user?.userId;
    const { name, url, events, isActive } = req.body;

    const data = await WebHookService.update({
      id: id!,
      userId: userId!,
      name,
      url,
      events,
      isActive,
    });
    return successResponse(res, data);
  },
);

export const deleteWebhook = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req?.user?.userId;
    const data = await WebHookService.deleteWebhook({ id: id!, userId: userId! });
    return successResponse(res, data);
  },
);
