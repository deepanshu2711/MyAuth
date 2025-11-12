import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/helpers.js";
import * as AuthService from "./auth.service.js";
import { successResponse } from "../../utils/responses.js";

export const token = asyncHandler(async (req: Request, res: Response) => {
  const { code, clientId } = req.body;
  const { refreshToken, accessToken } = await AuthService.getToken({
    code,
    clientId,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return successResponse(res, { accessToken });
});
