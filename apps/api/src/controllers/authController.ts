import { Request, Response } from "express";
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

export const signInUser = asyncHandler(async (req: Request, res: Response) => {
  const { data, error } = signInInputSchema.safeParse(req.body);
  if (error) throw new ApiError(422, "Zod Error");

  const { email, password } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (
    !existingUser ||
    (await matchPassword(password, existingUser?.password)) == false
  )
    throw new ApiError(400, "Invalid credentials");

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
});

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw new ApiError(401, "Unauthorized");

    const refreshToken = cookies.jwt;
    jwt.verify(
      refreshToken as string,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      async (error, decoded) => {
        if (error) throw new ApiError(403, "Forbidden");

        const user = await prisma.user.findUnique({
          where: { id: (decoded as JwtPayload)?.id },
        });

        if (!user) throw new ApiError(404, "User not found");
        const accessToken = generateAccessToken(user.id);
        res
          .status(200)
          .json(new ApiResponse<string>(200, accessToken, "Token refreshed"));
      }
    );
  }
);

export const signOutUser = asyncHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) throw new ApiError(404, "No cookies found");
  res.clearCookie("jwt", { httpOnly: true });
  res.status(200).json(new ApiResponse<null>(200, null, "Logged out"));
});
