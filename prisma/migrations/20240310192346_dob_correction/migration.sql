/*
  Warnings:

  - You are about to drop the column `dateofBirth` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `dateOfBirth` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "dateofBirth",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL;
