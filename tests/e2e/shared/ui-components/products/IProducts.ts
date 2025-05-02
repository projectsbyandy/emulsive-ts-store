import { ProductOverview } from "@e2e-shared/models";
import { ILoadVerification } from "../common";
import { IProductFilters } from "./IProductFilters";
import { IDetails } from "./IDetails";

export interface IProducts extends ILoadVerification {
   get Filters() : IProductFilters;
   get Details() : IDetails;
   getProductsOverview(): Promise<ProductOverview[]>;
   select(id: number): Promise<IDetails>;
   select(name: string): Promise<IDetails>;
}