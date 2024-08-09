import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
      success: err.success,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
};
