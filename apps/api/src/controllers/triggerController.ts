import { Request, Response, NextFunction } from 'express';
import prisma from '@repo/database';

export const getAvailableTriggers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const availableTriggers = await prisma.availableTriggers.findMany({});
    res.status(200).json({ availableTriggers });
  } catch (error) {
    next(error);
  }
};
