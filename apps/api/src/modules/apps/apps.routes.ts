import express from "express";
import * as AppsController from "./apps.controller.js";

export const appsRouter = express.Router();

appsRouter.get("/", AppsController.getApps);
appsRouter.post("/register", AppsController.register);
