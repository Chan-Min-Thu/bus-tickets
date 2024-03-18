import { ExpressCar } from "@prisma/client";
import { BasicOptions } from "./app";

export interface routeType {
    init:boolean,
    isLoading:boolean,
    error:Error | null;
}

export interface GetRouteOption extends BasicOptions{

}