/*
  Warnings:

  - Added the required column `isArchived` to the `ExpressCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ExpressCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpressCar" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
