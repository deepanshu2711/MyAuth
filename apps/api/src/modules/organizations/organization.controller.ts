import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/helpers.js";
import { OrgServices } from "./organization.service.js";
import { successResponse } from "../../utils/responses.js";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const ownerId = req.user?.userId;
  const data = await OrgServices.create({
    name,
    isPersonal: false,
    ownerId: ownerId!,
  });

  return successResponse(res, data);
});

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  console.log("userId", userId);
  const data = await OrgServices.getAllUserOrgs(userId!);

  return successResponse(res, data);
});
