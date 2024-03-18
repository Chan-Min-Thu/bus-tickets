import { BasicOptions } from "./app";

export interface OrderSearch extends BasicOptions {
  startFrom: string;
  arrivedTo: string;
}
