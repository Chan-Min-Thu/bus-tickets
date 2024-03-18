import { ExpressCar } from "@prisma/client";
import { BasicOptions } from "./app";
import { Dayjs } from "dayjs";

export interface CarType {
  items: ExpressCar[];
  isLoading: boolean;
  error: Error | null;
}
export interface CreateCarOption extends BasicOptions {
  id?: number;
  name: string;
  startFrom: string;
  arrivedTo: string;
  departureTime: Dayjs | null | Date;
  arrivedTime: Dayjs | null | Date;
  duration: Number;
  price: Number;
  seats: Number;
  isVIP: boolean;
}
export interface UpdateCarOption extends BasicOptions {
  id?: number;
  name: string;
  startFrom: string;
  arrivedTo: string;
  departureTime: Dayjs | null | Date;
  arrivedTime: Dayjs | null | Date;
  duration: Number;
  price: Number;
  seats: Number;
  isVIP: boolean;
}
export interface SearchOnlyCarOption {}
export interface DeleteCarOption extends BasicOptions {
  id: number | undefined;
}
export interface SearchCarOption {
  startFrom: string;
  arrivedTo: string;
  date: number | Date | null;
  traveller: string | string[] | undefined;
  seats: number;
}
