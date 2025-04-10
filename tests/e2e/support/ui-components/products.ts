import { Locator } from "@playwright/test";
import { IProductOverview } from "../models";
import { getProductOverviews } from "./productGrid";
import { Ui } from "./ui";
import z from 'zod';

export class Products extends Ui{
  get Filters() : ProductFilters {
     return new ProductFilters(this.page)
  }

  async getProductsOverview(): Promise<IProductOverview[]> {
    const productElements = this.page.getByTestId('products').locator("a[href^='/products']");
    return await getProductOverviews(productElements, z.string().parse(process.env.PAGINATION_ITEMS_PER_PAGE));
  }
}

class ProductFilters extends Ui{
  get Section(): Locator {
    return this.page.getByTestId('filters');
  }
}