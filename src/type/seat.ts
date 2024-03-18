import { Seats } from "@prisma/client";
import { BasicOptions } from "./app";
import { Dayjs } from "dayjs";

export interface SeatType {
  items: Seats[];
  isLoading: boolean;
  error: Error | null;
}
export interface GetSeat extends BasicOptions {
  carId: number;
  date: number;
}
