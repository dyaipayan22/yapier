import { Request, Response } from "express";
import prisma from "@repo/database";
import { hashPassword } from "../utils/password";
import { generateOtp } from "../utils/generateOtp";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { SanitizedUser, sanitizedUserSchema } from "@repo/schema";
import { sendEmail } from "@repo/mailer";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    await sendEmail(
      user.email,
      "We are excited to have you onboard. Have a great time automating and relaxing",
      "Welcome to Yapier"
    );
    const sanitizedUser = sanitizedUserSchema.parse(user);
    res
      .status(200)
      .json(new ApiResponse<SanitizedUser>(200, sanitizedUser, "User created"));
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      throw new Error("User does not exist");
    }

    const otp = generateOtp();

    await prisma.user.update({
      data: { resetPasswordOtp: otp },
      where: { email },
    });

    await sendEmail(
      email,
      `Your one time verification code to reset your password is ${otp}`,
      "Reset Password"
    );

    res.status(200).json(new ApiResponse<null>(200, null, "Email sent"));
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { otp, email, updatedPassword } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      throw new Error("User does not exist");
    }
    if (
      !existingUser.resetPasswordOtp ||
      existingUser.resetPasswordOtp !== otp
    ) {
      res.status(401).json("Invalid otp");
    }

    const hashedPassword = await hashPassword(updatedPassword);
    const updatedUser = await prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { email },
    });
    const sanitizedUser = sanitizedUserSchema.parse(updatedUser);

    res
      .status(200)
      .json(
        new ApiResponse<SanitizedUser>(200, sanitizedUser, "Password updated")
      );
  }
);
