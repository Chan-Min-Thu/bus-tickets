import { prisma } from "@/util/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const { carId, date } = req.query;
    console.log(carId, date);

    return res.status(200).json({ message: "hello" });
  }
  return res.status(404).send("Method is not allowed");
}
