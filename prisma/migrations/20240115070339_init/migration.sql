-- CreateTable
CREATE TABLE "ExpressCar" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startFrom" TEXT NOT NULL,
    "arrivedTo" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "arrivedTime" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "isVIP" BOOLEAN NOT NULL,

    CONSTRAINT "ExpressCar_pkey" PRIMARY KEY ("id")
);
