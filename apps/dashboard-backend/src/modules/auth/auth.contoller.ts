import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/helpers.js";
import { successResponse } from "../../utils/responses.js";
import { myAuth } from "../../lib/myAuth.js";

export const token = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;

  const { refreshToken, accessToken } = await myAuth.handleCallback(code);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
    domain: "",
  });

  return successResponse(res, { accessToken });
});
