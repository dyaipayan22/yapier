import { Request, Response, NextFunction } from 'express';
import { signIn } from '../interactors/authInteractor';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { getUserById } from '../repositories/userRepository';
import { generateAccessToken } from '../utils/generateTokens';

export async function signInUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accessToken, refreshToken } = await signIn(req.body);
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
}

export async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      res.status(401);
      throw new Error('Unauthorized');
    }
    const refreshToken = cookies.jwt;
    jwt.verify(
      refreshToken as string,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      async (error, decoded) => {
        if (error) {
          res.status(403);
          throw new Error('Forbidden');
        }
        const user = await getUserById((decoded as JwtPayload)?.id);
        if (!user) {
          res.status(401);
          throw new Error('Unauthorized');
        }
        const accessToken = generateAccessToken(user.id);
        res.json({ accessToken });
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function signOutUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      res.status(204);
      throw new Error('No cookies found');
    }
    res.clearCookie('jwt', { httpOnly: true });
    res.json({ message: 'Cookie cleared' });
  } catch (error) {
    next(error);
  }
}
