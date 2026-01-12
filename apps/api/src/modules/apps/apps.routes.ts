import express from "express";
import * as AppsController from "./apps.controller.js";

export const appsRouter = express.Router();

appsRouter.get("/", AppsController.getApps);
appsRouter.get("/summary", AppsController.getSummary);
appsRouter.get("/users/:appId", AppsController.getAppUsers);
appsRouter.get("/:appId", AppsController.getAppDetails);

appsRouter.post("/register", AppsController.register);

appsRouter.delete("/:appId", AppsController.deleteApp);
