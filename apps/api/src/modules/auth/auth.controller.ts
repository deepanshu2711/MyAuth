import type { Request, Response } from "express";

import * as AuthService from "./auth.service.js";
import { asyncHandler } from "../../utils/helpers.js";
import { successResponse } from "../../utils/responses.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, clientId, redirect_uri } = req.body;
  const redirectUrl = await AuthService.registerUser({
    email,
    password,
    clientId,
    redirect_uri,
  });
  return successResponse(res, redirectUrl);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, clientId, redirect_uri } = req.body;
  const redirectUrl = await AuthService.loginUser({
    email,
    password,
    clientId: clientId as string,
    redirect_uri: redirect_uri as string,
  });
  return successResponse(res, redirectUrl);
});

export const getTokens = asyncHandler(async (req: Request, res: Response) => {
  const { clientId, clientSecret, code } = req.body;
  const data = await AuthService.getTokens({ clientId, clientSecret, code });
  return successResponse(res, data);
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken, clientId } = req.body;
    const data = await AuthService.refreshToken({ refreshToken, clientId });
    return successResponse(res, data);
  },
);

export const verify = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const data = await AuthService.verify({ userId: user?.userId! });
  return successResponse(res, data);
});
