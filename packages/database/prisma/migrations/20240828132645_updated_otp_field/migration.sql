/*
  Warnings:

  - You are about to drop the column `verificationOtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `User` table. All the data in the column will be lost.
  - Added the required column `resetPasswordOtp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verificationOtp",
DROP COLUMN "verified",
ADD COLUMN     "resetPasswordOtp" TEXT NOT NULL;
