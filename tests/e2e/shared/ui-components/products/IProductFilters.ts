import { Filter } from "@e2e-shared/models/filter";
import { ILoadVerification } from "../common";

export interface IProductFilters extends ILoadVerification {
  set(filters: Filter[]): Promise<void>;
}