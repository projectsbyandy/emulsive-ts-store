import { ProductOverview } from "@e2e-shared/models";
import { ILoadVerification } from "../common";
import { IProductFilters } from "./IProductFilters";

 export interface IProducts extends ILoadVerification {
    get Filters() : IProductFilters
    getProductsOverview(): Promise<ProductOverview[]>;
    addToCart(name: string, quantity: number): Promise<void>
 }