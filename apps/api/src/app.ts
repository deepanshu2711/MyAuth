import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter } from "./modules/auth/routes.js";
import { appsRouter } from "./modules/apps/apps.routes.js";

export const app = express();

app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/app", appsRouter);
