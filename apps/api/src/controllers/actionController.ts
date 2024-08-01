import { Request, Response, NextFunction } from 'express';
import prisma from '@repo/database';

export const getAvailableActions = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const availableActions = await prisma.availableActions.findMany({});
    res.status(200).json({ availableActions });
  } catch (error) {
    next(error);
  }
};
