import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import prisma from "@repo/database";
import { generateAccessToken, generateTokens } from "../utils/generateTokens";
import { matchPassword } from "../utils/password";
import { ApiResponse } from "../utils/apiResponse";
import {
  SanitizedUser,
  sanitizedUserSchema,
  signInInputSchema,
} from "@repo/schema";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

export const signInUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { data, error } = signInInputSchema.safeParse(req.body);
    if (error) throw new ApiError(422, "Zod Error");

    const { email, password } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (
      !existingUser ||
      (await matchPassword(password, existingUser?.password)) == false
    )
      throw new Error("Invalid Credentials");

    const { accessToken, refreshToken } = generateTokens(existingUser.id);

    const user = sanitizedUserSchema.parse(existingUser);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json(
        new ApiResponse<{ user: SanitizedUser; accessToken: string }>(
          200,
          { user, accessToken },
          "Logged in"
        )
      );
  }
);

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const refreshToken = cookies.jwt;
    jwt.verify(
      refreshToken as string,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      async (error, decoded) => {
        if (error) {
          res.status(403);
          throw new Error("Forbidden");
        }
        const user = await prisma.user.findUnique({
          where: { id: (decoded as JwtPayload)?.id },
        });

        if (!user) {
          res.status(401);
          throw new Error("Unauthorized");
        }
        const accessToken = generateAccessToken(user.id);
        res.json({ accessToken });
      }
    );
  }
);

export const signOutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      res.status(204);
      throw new Error("No cookies found");
    }
    res.clearCookie("jwt", { httpOnly: true });
    res.json({ message: "Cookie cleared" });
  }
);
