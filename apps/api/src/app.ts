import express from "express";
import cors from "cors";

import { authRouter } from "./modules/auth/routes.js";
import { appsRouter } from "./modules/apps/apps.routes.js";

export const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/app", appsRouter);
