import { Request, Response } from "express";
import prisma from "@repo/database";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";

export const getAvailableTriggers = asyncHandler(
  async (_req: Request, res: Response) => {
    const availableTriggers = await prisma.availableTriggers.findMany({});
    res
      .status(200)
      .json(
        new ApiResponse(200, availableTriggers, "Available triggers fetched")
      );
  }
);
