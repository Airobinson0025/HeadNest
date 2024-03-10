/*
  Warnings:

  - You are about to drop the column `userId` on the `AccountInfo` table. All the data in the column will be lost.
  - Added the required column `accountInfoId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccountInfo" DROP CONSTRAINT "AccountInfo_userId_fkey";

-- DropIndex
DROP INDEX "AccountInfo_userId_key";

-- AlterTable
ALTER TABLE "AccountInfo" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountInfoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountInfoId_fkey" FOREIGN KEY ("accountInfoId") REFERENCES "AccountInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
