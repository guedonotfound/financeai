/*
  Warnings:

  - You are about to drop the column `isBought` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isBought",
ADD COLUMN     "isBought" BOOLEAN NOT NULL DEFAULT false;
