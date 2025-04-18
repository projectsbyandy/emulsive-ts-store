import { Order } from "@e2e-shared/models";
import { ILoadVerification } from "../common";

export interface IOrders extends ILoadVerification {
  getOrder(name: string): Promise<Order>
}