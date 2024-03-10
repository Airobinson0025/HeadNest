-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_accountInfoId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "accountInfoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountInfoId_fkey" FOREIGN KEY ("accountInfoId") REFERENCES "AccountInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
