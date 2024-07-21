import { NextFunction, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { getUserById } from '../repositories/userRepository';
import { AuthRequest } from '../types/AuthRequest';

export async function authenticateUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token as string,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    async (error, decoded) => {
      if (error) {
        res.status(403);
        throw new Error('Forbidden');
      }
      const user = await getUserById((decoded as JwtPayload).id);
      req.user = user?.id;
      next();
    }
  );
}