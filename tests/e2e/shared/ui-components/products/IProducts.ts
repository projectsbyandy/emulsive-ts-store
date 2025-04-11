import { ProductOverview } from "@e2e-shared/models";
import { ILoadable } from "../common";
import { IProductFilters } from "./IProductFilters";

 export interface IProducts extends ILoadable{
    get Filters() : IProductFilters
    getProductsOverview(): Promise<ProductOverview[]>;
 }