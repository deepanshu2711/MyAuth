import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter } from "./modules/auth/routes.js";
import { appsRouter } from "./modules/apps/apps.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

export const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/app", authMiddleware, appsRouter);
