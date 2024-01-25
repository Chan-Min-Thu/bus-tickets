import { ExpressCar } from "@prisma/client";
import { BaseOptions} from "./app"

export interface CarType {
    items:ExpressCar[],
    isLoading:boolean,
    error:Error | null;
}
export interface CreateCarOption extends BaseOptions{
    id?:number
    name:string,
    startFrom:string,
    arrivedTo:string,
    departureTime:Number
    arrivedTime:Number,
    duration:Number,
    price:Number,
    seats:Number,
    isVIP:boolean
}
export interface UpdateCarOption extends BaseOptions{
    id?:number
    name:string,
    startFrom:string,
    arrivedTo:string,
    departureTime:Number
    arrivedTime:Number,
    duration:Number,
    price:Number,
    seats:Number,
    isVIP:boolean
}

export interface DeleteCarOption extends BaseOptions{
    id:number | undefined ;
}