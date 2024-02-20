import { prisma } from "@/util/db";
import exp from "constants";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (req.method === "GET") {
    const {startFrom,arrivedTo} = req.body;
    const expressCar = await prisma.expressCar.findMany({
      where: { isArchived: false },
    });
   
    res.status(200).json({expressCar});
  }
  res.status(404).send("Method is not allowed");
}
