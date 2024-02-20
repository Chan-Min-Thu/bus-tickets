import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'
import { prisma } from '@/util/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req,res,authOptions)
  if(!session) return res.status(401).send("Unauthorized.")
  if(req.method === "POST"){
    //create car
    const {name,startFrom,arrivedTo,duration,departureTime,arrivedTime,price,isVIP,seats} = req.body;
    const isValid = name.length > 0 && startFrom.length > 0 && arrivedTo.length > 0 && duration > 0 && departureTime  && arrivedTime && price > 0 && seats > 0
    if(!isValid) return res.status(404).send("Error is Found.")
    const expressCar = await prisma.expressCar.create({data:{name,startFrom,arrivedTo,duration,departureTime,arrivedTime,price,isVIP,seats}})
    return res.status(200).json({expressCar})
  }else if(req.method === "PUT"){
    //update car
    const {id,name,startFrom,arrivedTo,duration,departureTime,arrivedTime,price,isVIP,seats} = req.body;
     const isCar = await prisma.expressCar.findFirst({where:{id}})
     if(!isCar) return res.status(400).send("Bad request.");
     const isValid = name.length > 0 || startFrom.length > 0 || arrivedTo.length > 0 || duration > 0 || departureTime.getHours >0  || arrivedTime.getHours >0  || price > 0 || seats > 0;
     if(!isValid) return res.status(400).send("Bad request.");
     const expressCar = await prisma.expressCar.update({where:{id:isCar?.id},data:{name,startFrom,arrivedTo,duration,departureTime,arrivedTime,price,isVIP,seats}})
     return res.status(200).json(expressCar);
  }else if(req.method === "DELETE"){
    const carId = Number(req.query.id)
    const isCar = await prisma.expressCar.findFirst({where:{id:carId}})
    if(!isCar) return res.status(400).send("Bad request.")
    await prisma.expressCar.update({where:{id:carId},data:{isArchived:true}})
    return res.status(200).json({carId});
  }
  res.status(404).send("Method is not allowed.")
}
