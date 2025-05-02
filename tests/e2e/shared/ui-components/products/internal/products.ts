import { ProductOverview } from "@e2e-shared/models";
import { getProductOverviews } from "../../common/productGrid";
import { IProductFilters } from "../IProductFilters";
import { ProductFilters } from "./ProductFilters";
import { IProducts } from "../IProducts";
import { Page, Locator, expect } from "@playwright/test";
import { hasContentLoaded, traverseUp, Ui } from "@/e2e/shared/playwright-helpers";
import { IDetails } from "../IDetails";
import { Details } from "./Details";

export class Products extends Ui implements IProducts {

  private readonly productFilters: IProductFilters;
  private readonly details: IDetails;

  constructor(page: Page) {
    super(page);
    this.productFilters = new ProductFilters(page);
    this.details = new Details(page);
  }

  // Locators
  private readonly paginationSection: Locator = this.page.getByRole('navigation', { name: 'pagination' });
  private readonly nextButton: Locator = this.page.locator("a span:text('Next')");
  private readonly productsContainer: Locator = this.page.getByTestId('products').locator("a[href^='/products']");

  // Operations
  get Filters() : IProductFilters {
     return this.productFilters;
  }

  get Details() : IDetails {
    return this.details;
  }

  async getProductsOverview(): Promise<ProductOverview[]> {
    let products: ProductOverview[] = [];
    let lastPage = false

    while(!lastPage) {
      const retrievedProducts = await this.getProductsOnPage();
      products.push(...retrievedProducts);
      
      const hasPaginatedResults = await hasContentLoaded(this.nextButton);
      if (hasPaginatedResults === false) {
        break;
      }

      const hrefNext = await traverseUp(this.nextButton, 1).getAttribute('href');

      // last next button iterates back to the first page
      if (hrefNext?.endsWith('page=1'))
        lastPage = true;
      else {
        await this.nextButton.click();
        await hasContentLoaded(this.nextButton);
      }  
    }
  
    return products;
  }

  async select(value: number | string): Promise<IDetails> {
    typeof value === 'number' 
    ? await this.page.goto(`${process.env.EMULSIVE_STORE_URL}/products/${value}`)
    : await this.page.locator(`h2[class*='capitalize']:text('${value}')`).click();

    return this.details;
  }

  private async getProductsOnPage():Promise<ProductOverview[]> {
    await expect(this.productsContainer.last()).toBeVisible();
    return await getProductOverviews(this.productsContainer);
  } 

  async hasLoaded(): Promise<boolean> {
    return hasContentLoaded(this.paginationSection);
  }
}