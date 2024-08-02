import { Request, Response, NextFunction } from 'express';
import prisma from '@repo/database';
import { hashPassword } from '../utils/password';
import { generateOtp } from '../utils/generateOtp';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await hashPassword(password);
    const otp = generateOtp();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationOtp: parseInt(otp),
      },
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
