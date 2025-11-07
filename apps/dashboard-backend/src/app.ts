import express from "express";
import cors from "cors";

export const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
