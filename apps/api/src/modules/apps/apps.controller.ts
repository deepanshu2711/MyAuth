import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/helpers.js";
import * as AppService from "./apps.service.js";
import { AppError } from "../../utils/appError.js";
import { successResponse } from "../../utils/responses.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, redirectUris, orgId } = req.body ?? {};
  if (typeof name !== "string" || !name.trim()) {
    throw new AppError("App name is required", 400);
  }
  if (
    !Array.isArray(redirectUris) ||
    redirectUris.length === 0 ||
    !redirectUris.every(isValidRedirectUri)
  ) {
    throw new AppError(
      "redirectUris must be a non-empty array of valid URLs",
      400,
    );
  }

  const user = req.user;
  const data = await AppService.registerApp({
    name: name.trim(),
    ownerId: user?.userId!,
    redirectUris: redirectUris.map((uri) => uri.trim()),
    orgId,
  });
  return successResponse(res, data);
});

function isValidRedirectUri(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

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

export const getAppActiveSessions = asyncHandler(
  async (req: Request, res: Response) => {
    const { appId } = req.params;
    const data = await AppService.getAppActiveSessions({ appId: appId! });
    return successResponse(res, data);
  },
);

export const getAppSecret = asyncHandler(
  async (req: Request, res: Response) => {
    const { appId } = req.params;
    const user = req.user;
    const data = await AppService.getAppSecret({
      appId: appId!,
      userId: user?.userId!,
    });
    return successResponse(res, data);
  },
);

export const deleteApp = asyncHandler(async (req, res) => {
  const { appId } = req.params;
  const data = await AppService.deleteApp({ appId });
  return successResponse(res, data);
});

export const updateRedirectUri = asyncHandler(async (req, res) => {
  const { appId } = req.params;
  const { redirectUri } = req.body;
  const data = await AppService.updateRedirectUri({ appId, redirectUri });
  return successResponse(res, data);
});
