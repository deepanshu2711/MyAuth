import express from "express";
import * as OrgController from "./organization.controller.js";

export const orgRoutes = express.Router();

orgRoutes.get("/", OrgController.getAll);
orgRoutes.post("/", OrgController.create);

orgRoutes.get("/:id/apps", OrgController.getOgrApps);
orgRoutes.get("/:id/team", OrgController.getOgrTeam);

// orgRoutes.post("/:id/invite");
