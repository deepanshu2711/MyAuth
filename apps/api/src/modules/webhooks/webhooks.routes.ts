import express from "express";
import * as WebHookController from "./webhooks.controller.js";

export const webHookRouter = express.Router();

webHookRouter.get("/:appId", WebHookController.getAppWebhooks);
webHookRouter.post("/", WebHookController.createWebhook);
webHookRouter.patch("/:id", WebHookController.updateWebhook);
webHookRouter.delete("/:id", WebHookController.deleteWebhook);
