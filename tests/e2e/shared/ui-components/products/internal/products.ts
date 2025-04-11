import { ProductOverview } from "@e2e-shared/models";
import { getProductOverviews } from "../../common/productGrid";
import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import z from 'zod';
import { customExpect } from "@/e2e/shared/playwright-helpers/expectExtensions";
import { IProductFilters } from "../IProductFilters";
import { ProductFilters } from "./productFilters";
import { IProducts } from "../IProducts";

export class Products extends Ui implements IProducts{
  // Locators
  private products = this.page.getByTestId('products').locator("a[href^='/products']");
  private paginationSection = this.page.getByRole('navigation', { name: 'pagination' });

  // Operations
  get Filters() : IProductFilters {
     return new ProductFilters(this.page)
  }

  async getProductsOverview(): Promise<ProductOverview[]> {
    return await getProductOverviews(this.products, z.string().parse(process.env.PAGINATION_ITEMS_PER_PAGE));
  }

  async loaded(): Promise<void> {
    await customExpect(this.paginationSection).toBeInScrolledViewPort();
  }
}