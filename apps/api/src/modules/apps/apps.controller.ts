import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/helpers.js";
import * as AppService from "./apps.service.js";
import { successResponse } from "../../utils/responses.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, ownerId, redirectUris } = req.body;
  const data = await AppService.registerApp({ name, ownerId, redirectUris });
  return successResponse(res, data);
});

export const getApps = asyncHandler(async (req: Request, res: Response) => {
  //const user = req.user;
  const userId = "69088ec11250e70387748e2a";

  // const data = await AppService.getUserApps({ userId: user?.userId! });
  const data = await AppService.getUserApps({ userId });
  return successResponse(res, data);
});
