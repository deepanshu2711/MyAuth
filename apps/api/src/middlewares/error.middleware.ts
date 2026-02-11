import type { Request, Response, NextFunction } from "express";
import type { AppError } from "../utils/appError.js";
import { errorResponse } from "../utils/responses.js";

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return errorResponse(res, message, statusCode);
};
