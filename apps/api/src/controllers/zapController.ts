import { Response, NextFunction } from "express";
import prisma from "@repo/database";
import { AuthRequest } from "../types/AuthRequest";

export const createZap = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
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

      res.json({ zap });
      return zap.id;
    });
  } catch (error) {
    next(error);
  }
};

export const getAllZaps = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
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

    return res.status(200).json({
      zaps,
    });
  } catch (error) {
    next(error);
  }
};

export const getZapById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
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

    return res.status(200).json({
      zap,
    });
  } catch (error) {
    next(error);
  }
};
