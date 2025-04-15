import { Locator } from "@playwright/test";
import { IProductFilters } from "../IProductFilters";
import { FilterOption } from "@/e2e/shared/models";
import { Filter } from "@/e2e/shared/models/filter";
import { hasContentLoaded, Ui, sliderSet } from "@/e2e/shared/playwright-helpers";

export class ProductFilters extends Ui implements IProductFilters{
  // locators
  private readonly keywordLocator: Locator = this.page.locator("#keyword");
  private readonly formatLocator: Locator = this.page.locator("select[name='format']");
  private readonly manufacturerLocator: Locator = this.page.locator("select[name='manufacturer']");
  private readonly orderByLocator: Locator = this.page.locator("select[name='orderby']");
  private readonly onSaleLocator: Locator = this.page.locator("#onsale");
  private readonly priceLocator: Locator = this.page.locator("#price");
  private readonly priceMax: number = 30.00;
  private readonly searchButton: Locator = this.page.locator("button[type='submit']");
  
  // operations
  async set(filters: Filter[]): Promise<void> {
    const filterOptions = new Map<FilterOption, (value: string) => Promise<void>>([
      [FilterOption.Keyword, async (value) => await this.keywordLocator.fill(value)],
      [FilterOption.Format, async (value) => { await this.formatLocator.selectOption(value) }],
      [FilterOption.Manufacturer, async (value) => { await this.manufacturerLocator.selectOption(value) }],
      [FilterOption.Manufacturer, async (value) => { await this.manufacturerLocator.selectOption(value) }],
      [FilterOption.OrderBy, async (value) => { await this.orderByLocator.selectOption(value) } ],
      [FilterOption.OnSale, async (value) => {
          if (value === "checked" && !(await this.onSaleLocator.isChecked())) {
              await this.onSaleLocator.click();
          }
      }],
      [FilterOption.Price, async (value) => await sliderSet(this.priceLocator, this.page, this.priceMax, value)],
    ]);

    for (const filter of filters) {
      await filterOptions.get(filter.option)?.(filter.value) ?? new Error(`Option not found: ${filter.option}`);
    }

    await this.searchButton.click()
  }

  async hasLoaded(): Promise<boolean> {
    return hasContentLoaded(this.searchButton);
  }
}