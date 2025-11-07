import type { Request, Response } from "express";

import * as AuthService from "./auth.service.js";
import { asyncHandler } from "../../utils/helpers.js";
import { successResponse } from "../../utils/responses.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, clientId } = req.body;
  const data = await AuthService.registerUser({ email, password, clientId });
  return successResponse(res, data);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { clientId, redirect_uri } = req.query;
  const redirectUrl = await AuthService.loginUser({
    email,
    password,
    clientId: clientId as string,
    redirect_uri: redirect_uri as string,
  });
  return res.redirect(redirectUrl.toString());
});

export const getTokens = asyncHandler(async (req: Request, res: Response) => {
  const { clientId, clientSecret, code } = req.body;
  const data = await AuthService.getTokens({ clientId, clientSecret, code });
  return successResponse(res, data);
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const data = await AuthService.refreshToken({ refreshToken });
    return successResponse(res, data);
  },
);
