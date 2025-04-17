import { ILoadVerification } from "../common";

export interface ICheckout extends ILoadVerification {
  placeOrder(firstName: string, address: string): Promise<void>
}