import { Request, Response } from "express";
import prisma from "@repo/database";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";

export const getAvailableActions = asyncHandler(
  async (_req: Request, res: Response) => {
    const availableActions = await prisma.availableActions.findMany({});
    res
      .status(200)
      .json(
        new ApiResponse(200, availableActions, "Available actions fetched")
      );
  }
);
