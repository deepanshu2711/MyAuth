import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./modules/auth/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();

export const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
