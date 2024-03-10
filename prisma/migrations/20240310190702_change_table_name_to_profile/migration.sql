/*
  Warnings:

  - You are about to drop the column `accountInfoId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AccountInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_accountInfoId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountInfoId",
ADD COLUMN     "profileId" TEXT;

-- DropTable
DROP TABLE "AccountInfo";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT NOT NULL,
    "dateofBirth" TIMESTAMP(3) NOT NULL,
    "genderIdentity" TEXT,
    "pronouns" TEXT,
    "location" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
