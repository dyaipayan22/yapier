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
    const otp = generateOtp();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationOtp: parseInt(otp),
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
