import { ProductDetail } from "@e2e-shared/models";
import { ILoadVerification } from "../common";

export interface IDetails extends ILoadVerification {
   details(): Promise<ProductDetail>;
   addQuantityToCart(quantity: number): Promise<void>;
}