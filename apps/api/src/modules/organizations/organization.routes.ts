import express from "express";
import * as OrgController from "./organization.controller.js";

export const orgRoutes = express.Router();

orgRoutes.get("/", OrgController.getAll);
orgRoutes.get("/:id/apps", OrgController.getOgrApps);
orgRoutes.post("/", OrgController.create);
