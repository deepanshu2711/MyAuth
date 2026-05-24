import { Request, Response } from "express";

export const getHealth = (req: Request, res: Response) => {
  const uptime = process.uptime();
  const timestamp = new Date().toISOString();

  res.status(200).json({
    status: "ok",
    timestamp,
    uptime,
  });
};
