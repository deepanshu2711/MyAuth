import express from "express";
import * as AuthController from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import rateLimit from "express-rate-limit";

const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per window
    message: { message: "Too many requests from this IP, please try again after 15 minutes" },
});

export const authRouter = express.Router();

authRouter.get("/me", authMiddleware, AuthController.getCurrentLoggedInUser);
authRouter.get("/verify", authMiddleware, AuthController.verify);

authRouter.post("/register", otpLimiter, AuthController.register);

//NOTE: depreciated
authRouter.post("/login", AuthController.login);

//NOTE: new login-by-otp
authRouter.post("/login-by-otp", otpLimiter, AuthController.loginByOtp);
authRouter.post("/verify-login-by-otp", otpLimiter, AuthController.VerifyLoginByOtp);

authRouter.post("/token", AuthController.getTokens);
authRouter.post("/refresh/token", AuthController.refreshToken);
authRouter.post("/logout", authMiddleware, AuthController.logout);

authRouter.post("/google", AuthController.verifyGoogleToken);
authRouter.get("/github", AuthController.redirectToGitHubAuth);
authRouter.get("/github/callback", AuthController.handleGithubRedirect);
