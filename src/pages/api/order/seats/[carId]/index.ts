import { prisma } from "@/util/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const carId = Number(req.query.carId);
    const date = Number(req.query.date);
    // console.log(date);
    const isValid = carId > 0;
    if (!isValid) return res.status(400).send("Bad request...");
    const bookings = await prisma.booking.findMany({
      where: { expressCarId: carId, date: new Date(date) },
    });
    const relatedBookings: number[] = bookings.map((item) => item.id);
    const seats = await prisma.$transaction(
      relatedBookings.map((i) =>
        prisma.seats.findFirst({ where: { bookingId: i } })
      )
    );
    console.log(seats);
    return res.status(200).json({ seats });
  }
  res.status(200).json({ name: "John Doe" });
}
