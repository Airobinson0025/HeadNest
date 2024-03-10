/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "AccountInfo" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT NOT NULL,
    "dateofBirth" TIMESTAMP(3) NOT NULL,
    "genderIdentity" TEXT,
    "pronouns" TEXT,
    "location" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountInfo_userId_key" ON "AccountInfo"("userId");

-- AddForeignKey
ALTER TABLE "AccountInfo" ADD CONSTRAINT "AccountInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
