import type { Request, Response } from "express";

import * as AuthService from "./auth.service.js";
import { asyncHandler } from "../../utils/helpers.js";
import { successResponse } from "../../utils/responses.js";
import { AppError } from "../../utils/appError.js";

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
    const { refreshToken } = req.body;
    const data = await AuthService.refreshToken({ refreshToken });
    return successResponse(res, data);
  },
);

export const verify = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const data = await AuthService.verify({ userId: user?.userId! });
  return successResponse(res, data);
});

export const getCurrentLoggedInUser = async (req: Request, res: Response) => {
  const user = req.user;
  const data = await AuthService.me({
    userId: user?.userId!,
  });
  return successResponse(res, data);
};

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new AppError("No refresh token provided", 400);
  const data = await AuthService.logout({ refreshToken });
  res.clearCookie("refreshToken");
  return successResponse(res, data);
});

export const verifyGoogleToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { idToken, clientId, redirect_uri } = req.body;
    const redirectUrl = await AuthService.googleLogin(idToken, clientId);
    return successResponse(res, redirectUrl);
  },
);

export const redirectToGitHubAuth = asyncHandler(
  async (req: Request, res: Response) => {
    const { clientId } = req.query;
    const result = await AuthService.redirectToGithubAuth(clientId as string);

    res.redirect(result.redirectUrl);
  },
);

export const handleGithubRedirect = asyncHandler(
  async (req: Request, res: Response) => {
    const { code, state } = req.query;
    const redirectUrl = await AuthService.githubRedirect(
      code as string,
      state as string,
    );

    return res.redirect(redirectUrl.toString());
  },
);
