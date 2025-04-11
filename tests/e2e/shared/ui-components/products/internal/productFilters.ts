import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { Locator } from "@playwright/test";
import { IProductFilters } from "../IProductFilters";

export class ProductFilters extends Ui implements IProductFilters{
  get Section(): Locator {
    return this.page.getByTestId('filters');
  }
}