import { prisma } from '@/util/db'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method
  if(req.method === "GET"){
    const startFrom = "Mandalay";
    const trip = await prisma.expressCar.findMany({where:{startFrom}})
    res.status(200).json({trip})
  }
  res.status(404).send("Method is not allowed")
}