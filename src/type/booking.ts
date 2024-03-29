import { Booking } from "@prisma/client";
import { BasicOptions } from "./app";
import { Dayjs } from "dayjs";

export interface BookingType {
  items: Booking[] | Booking;
  isLoading: boolean;
  error: any | null;
}
export interface GetBooking extends BasicOptions {
  bookingId: string;
}
export interface CreateBooking extends BasicOptions {
  name: string;
  gender: string;
  seats: number[];
  bookingId: string;
  expressCarId: number;
  isLocal: string;
  date: Dayjs | null | Date;
}
