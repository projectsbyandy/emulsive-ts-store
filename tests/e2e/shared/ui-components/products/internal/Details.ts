import { hasContentLoaded, Ui } from "@/e2e/shared/playwright-helpers";
import { IDetails } from "../IDetails";
import { ProductDetail } from "@/e2e/shared/models";
import { Locator } from "@playwright/test";
import { z } from "zod";

export class Details extends Ui implements IDetails {
  // locators
  private readonly productDetails: Locator = this.page.getByTestId('productDetails');
  private readonly addToCartButton: Locator = this.page.getByTestId('addToCart');
  private readonly quantityDropdown: Locator = this.productDetails.getByRole("combobox");
  private readonly selectOption = (quantity: number) => this.page.locator(`[role="option"]:has-text("${quantity.toString()}")`);
  
  // operations
  async details(): Promise<ProductDetail> {
    return {
      name: z.string().parse(await this.productDetails.getByTestId('name').textContent()),
      imageUrl: z.string().parse(await this.productDetails.getByTestId('imageUrl').getAttribute('src')),
      manufacturer: z.string().parse(await this.productDetails.getByTestId('manufacturer').textContent()),
      iso: z.string().parse(this.extractValues(z.string().parse(await this.productDetails.getByTestId('iso').textContent()), 'ISO:')),
      format: z.string().parse(this.extractValues(z.string().parse(await this.productDetails.getByTestId('format').textContent()), 'Format:')),
      description: z.string().parse(await this.productDetails.getByTestId('description').textContent()),
      priceWithCurrency: z.string().parse(await this.productDetails.getByTestId('price').textContent()),
    }
  }

  async addQuantityToCart(quantity: number): Promise<void> {
    await this.quantityDropdown.click();
    await this.selectOption(quantity).click();
    await this.addToCartButton.click();
  }
  
  async hasLoaded(): Promise<boolean> {
    return hasContentLoaded(this.addToCartButton);
  }

  private extractValues(rawText: string, propertyName: string): string | null {
    const regex = new RegExp(`${propertyName}\\s*(.*)`, 'i');
    const match = rawText.match(regex);
    return match ? match[1] : null;
  }
}