import { Response } from "express";
import prisma from "@repo/database";
import { AuthRequest } from "../types/AuthRequest";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";

export const createZap = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user;
    if (!userId) throw new Error("User not authenticated");
    const { actions, availableTriggerId } = req.body;

    await prisma.$transaction(async (tx) => {
      const zap = await tx.zap.create({
        data: {
          userId,
          triggerId: "",
          actions: {
            create: actions.map((x, index) => ({
              actionId: x.availableActionId,
              sortingOrder: index,
              metaData: x.actionMetadata,
            })),
          },
        },
      });

      const trigger = await tx.trigger.create({
        data: {
          triggerId: availableTriggerId,
          zapId: zap.id,
        },
      });

      await tx.zap.update({
        where: {
          id: zap.id,
        },
        data: {
          triggerId: trigger.id,
        },
      });

      res.status(200).json(new ApiResponse(200, zap, "Zap created"));
      return zap.id;
    });
  }
);

export const getAllZaps = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const id = req.user;
    const zaps = await prisma.zap.findMany({
      where: {
        userId: id,
      },
      include: {
        actions: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });

    return res.status(200).json(new ApiResponse(200, zaps, "Zaps fetched"));
  }
);

export const getZapById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const id = req.user;
    const zapId = req.params.zapId;

    const zap = await prisma.zap.findFirst({
      where: {
        id: zapId,
        userId: id,
      },
      include: {
        actions: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });

    if (!zap) throw new ApiError(404, "Zap not found");

    return res.status(200).json(new ApiResponse(200, zap, "Zap details"));
  }
);
