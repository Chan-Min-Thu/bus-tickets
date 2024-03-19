import { prisma } from "@/util/db";
import exp from "constants";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const expressCar = await prisma.expressCar.findMany({
      where: { isArchived: false },
    });

    return res.status(200).json({ expressCar });
  }
  return res.status(404).send("Method is not allowed");
}
