import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/helpers.js";
import * as AppService from "./apps.service.js";
import { successResponse } from "../../utils/responses.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, ownerId, redirectUris } = req.body;
  const data = await AppService.registerApp({ name, ownerId, redirectUris });
  return successResponse(res, data);
});

// {
//     "message": "success",
//     "data": {
//         "clientId": "app_PL3hxNa-ZLRGSn6g",
//         "clientSecret": "sh_0lq2qWaS8FC2iaZEu2P7hblBBwXiApJp3NFNDBRWHbc"
//     }
// }
