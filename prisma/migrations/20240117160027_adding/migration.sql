/*
  Warnings:

  - Changed the type of `departureTime` on the `ExpressCar` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `arrivedTime` on the `ExpressCar` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ExpressCar" DROP COLUMN "departureTime",
ADD COLUMN     "departureTime" INTEGER NOT NULL,
DROP COLUMN "arrivedTime",
ADD COLUMN     "arrivedTime" INTEGER NOT NULL,
ALTER COLUMN "isArchived" SET DEFAULT false;
