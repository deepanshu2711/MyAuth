import express from "express";
import * as AuthController from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

export const authRouter = express.Router();

authRouter.get("/me", authMiddleware, AuthController.getCurrentLoggedInUser);
authRouter.get("/verify", authMiddleware, AuthController.verify);

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/token", AuthController.getTokens);
authRouter.post("/logout", authMiddleware, AuthController.logout);

authRouter.post("/google", AuthController.verifyGoogleToken);
