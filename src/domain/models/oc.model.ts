import { Client } from "./client.model";
import { OCItem } from "./oc-item.model";
import { OCStatus } from "./types/oc-status.type";

export type OC = {
  id?: string;
  client?: Client;
  date?: Date;
  paymentDate?: Date;
  amount: number;
  status: OCStatus;
  sync: boolean;
};