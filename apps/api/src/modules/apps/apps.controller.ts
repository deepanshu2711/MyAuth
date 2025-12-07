import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/helpers.js";
import * as AppService from "./apps.service.js";
import { successResponse } from "../../utils/responses.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, redirectUris } = req.body;
  const user = req.user;
  const data = await AppService.registerApp({
    name,
    ownerId: user?.userId!,
    redirectUris,
  });
  return successResponse(res, data);
});

export const getApps = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const data = await AppService.getUserApps({ userId: user?.userId! });
  return successResponse(res, data);
});

export const getAppUsers = asyncHandler(async (req: Request, res: Response) => {
  const data = await AppService.getAppUsers({ appId: req.params.appId! });
  return successResponse(res, data);
});

export const getSummary = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const data = await AppService.getSummary({ userId: user?.userId! });
  return successResponse(res, data);
});

export const getAppDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { appId } = req.params;
    const data = await AppService.getAppDetails({ appId: appId! });
    return successResponse(res, data);
  },
);
