import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { prisma } from "@/util/db";
import { getTime } from "@/util/general";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unauthorized.");
  if (req.method === "GET") {
    const date = new Date();
    const arrivedDate = getTime(date, 10);
    const name: string = "Pinlae Pyar";
    const startFrom: string = "Mandalay";
    const arrivedTo: string = "Yangon";
    const departureTime: Date = new Date();
    const duration: number = 9;
    const arrivedTime: Date = arrivedDate;
    const price: number = 25000;
    const isVIP: boolean = false;
    const seats: number = 40;
    const isExit = await prisma.expressCar.findFirst({
      where: { startFrom, arrivedTo },
    });
    !isExit &&
      (await prisma.expressCar.create({
        data: {
          name,
          startFrom,
          arrivedTo,
          departureTime,
          duration,
          arrivedTime,
          price,
          isVIP,
          seats,
        },
      }));
    const expressCar = await prisma.expressCar.findMany({
      where: { isArchived: false },
    });
    const bookings = await prisma.booking.findMany({
      where: { isArchived: false },
    });
    const seat = await prisma.seats.findMany({ where: { isArchived: false } });
    return res.status(200).json({ expressCar, bookings, seat });
  }
  return res.status(404).send("Method is not allowed.");
}
