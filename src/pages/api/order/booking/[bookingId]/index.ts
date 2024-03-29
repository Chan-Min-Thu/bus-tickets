import { prisma } from "@/util/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const bookingId = req.query.bookingId as string;
    const isValid = bookingId && bookingId.length > 0;
    if (!isValid) return res.status(400).json({ message: "Bad request...." });
    const booking = await prisma.booking.findFirst({
      where: { bookingId },
    });
    // if (!booking)
    //   return res.status(400).json({ message: "Invalid BookingId..." });
    // const car = await prisma.expressCar.findFirst({
    //   where: { id: booking?.expressCarId },
    // });
    const seats = await prisma.seats.findMany({
      where: { bookingId: booking?.id },
    });
    return res.status(200).json({ booking, seats });
  }
  return res.status(404).send("Method is not allowed");
}
