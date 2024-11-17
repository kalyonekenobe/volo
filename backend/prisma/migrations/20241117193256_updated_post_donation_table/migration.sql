/*
  Warnings:

  - You are about to drop the column `removedAt` on the `PostDonation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostDonation" DROP COLUMN "removedAt",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
