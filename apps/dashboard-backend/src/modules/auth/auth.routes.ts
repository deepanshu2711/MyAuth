import express from "express";
import * as AuthController from "./auth.contoller.js";

export const authRouter = express.Router();

authRouter.post("/token", AuthController.token);
