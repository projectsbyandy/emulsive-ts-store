import { ProductOverview } from "@e2e-shared/models";
import { getProductOverviews } from "../../common/productGrid";
import z from 'zod';
import { IProductFilters } from "../IProductFilters";
import { ProductFilters } from "./ProductFilters";
import { IProducts } from "../IProducts";
import { Page, Locator } from "@playwright/test";
import { hasContentLoaded, Ui } from "@/e2e/shared/playwright-helpers";

export class Products extends Ui implements IProducts{

  private readonly productFilters: IProductFilters;

  constructor(page: Page) {
    super(page);
    this.productFilters = new ProductFilters(page);
  }

  // Locators
  private products: Locator = this.page.getByTestId('products').locator("a[href^='/products']");
  private paginationSection: Locator = this.page.getByRole('navigation', { name: 'pagination' });
  
  private quantityDropdown: Locator = this.page.getByTestId('productDetails').getByRole("combobox");
  private selectOption = (quantity: number) => this.page.locator(`[role="option"]:has-text("${quantity.toString()}")`);
  private addToCartButton: Locator = this.page.getByTestId('addToCart');

  // Operations
  get Filters() : IProductFilters {
     return this.productFilters;
  }

  async getProductsOverview(): Promise<ProductOverview[]> {
    return await getProductOverviews(this.products, z.string().parse(process.env.PAGINATION_ITEMS_PER_PAGE));
  }

  async hasLoaded(): Promise<boolean> {
    return hasContentLoaded(this.paginationSection);
  }

  async addToCart(name: string, quantity: number): Promise<void> {
     await this.page.locator(`h2[class*='capitalize']:text('${name}')`).click();
     await this.quantityDropdown.click();
     await this.selectOption(quantity).click();
     await this.addToCartButton.click();
  }
}