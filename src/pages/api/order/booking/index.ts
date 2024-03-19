import { prisma } from "@/util/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    // seats and trip id comfrimed
    const { name, expressCarId, date, isLocal, gender, seats, bookingId } =
      req.body;
    console.log("a", req.body);
    const bookingid: string = bookingId as string;
    const dateSet = new Date(date);
    // console.log(Date.now(dateSet))
    // console.log(dateSet);
    const isValid =
      name.length > 0 &&
      expressCarId > 0 &&
      isLocal.length > 0 &&
      gender.length > 0 &&
      bookingId.length > 0;
    // seats?.length > 0;
    if (!isValid) return res.status(400).send("Bad request...");
    const booking = await prisma.booking.create({
      data: {
        name,
        bookingId: bookingid,
        expressCarId,
        date: dateSet,
        isLocal,
        gender,
        confirmed: false,
      },
    });
    console.log(booking);
    const seat = await prisma.$transaction(
      seats.map((item: number) =>
        prisma.seats.create({ data: { bookingId: booking.id, seatNo: item } })
      )
    );

    // console.log(seat);
    return res.status(200).json({ booking, seat });
  }
  return res.status(404).send("Method is not allowed.");
}
