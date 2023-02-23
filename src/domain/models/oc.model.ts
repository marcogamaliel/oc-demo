import { Client } from "./client.model";
import { OCItem } from "./oc-item.model";
import { OCStatus } from "./types/oc-status.type";

export type OC = {
  id?: string;
  client?: Client;
  items: OCItem[];
  date?: Date;
  paymentDate?: Date;
  total: number;
  status: OCStatus;
  sync: boolean;
};