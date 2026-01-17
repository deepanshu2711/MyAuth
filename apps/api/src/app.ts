import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter } from "./modules/auth/routes.js";
import { appsRouter } from "./modules/apps/apps.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { SignInKey } from "./models/signingkey.model.js";
import { pemTOJwk } from "./utils/pemToJwk.js";
dotenv.config();

export const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

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

app.use("/.well-known/jwks.json", async (req, res) => {
  const keys = await SignInKey.find({ isActive: true });

  const jwks = await Promise.all(
    keys.map((key) => pemTOJwk(key.publicKey, key._id.toString())),
  );

  res.setHeader(
    "Cache-Control",
    "public, max-age=300, stale-while-revalidate=300",
  );
  res.json({ keys: jwks });
});
