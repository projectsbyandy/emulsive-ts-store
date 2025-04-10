import { Locator } from "@playwright/test";
import { IProductOverview } from "../models";
import { getProductOverviews } from "./productGrid";
import { Ui } from "./ui";
import z from 'zod';
import { ILoadable } from "./loadable";
import { customExpect } from "../playwright-ext/expectExtensions";

export class Products extends Ui implements ILoadable{
  // Locators
  private products = this.page.getByTestId('products').locator("a[href^='/products']");
  private paginationSection = this.page.getByRole('navigation', { name: 'pagination' });

  // Operations
  get Filters() : ProductFilters {
     return new ProductFilters(this.page)
  }

  async getProductsOverview(): Promise<IProductOverview[]> {
    return await getProductOverviews(this.products, z.string().parse(process.env.PAGINATION_ITEMS_PER_PAGE));
  }

  async loaded(): Promise<void> {
    await customExpect(this.paginationSection).toBeInScrolledViewPort();
  }
}

class ProductFilters extends Ui{
  get Section(): Locator {
    return this.page.getByTestId('filters');
  }
}