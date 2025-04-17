import { ICheckout } from "../ICheckout";
import { Locator } from "@playwright/test";
import { hasContentLoaded, Ui } from "@/e2e/shared/playwright-helpers";

 export class Checkout extends Ui implements ICheckout {
    // locators
    private readonly cartEmptyMessage: Locator = this.page.locator('h2[class*="capitalize"]:has-text("Your Cart is Empty")');
    private readonly firstName: Locator = this.page.locator("#name");
    private readonly address: Locator = this.page.locator("#address");
    private readonly placeOrderButton: Locator = this.page.locator("button[type='submit']:text('place order')");

    // operations
    async placeOrder(firstName: string, address: string): Promise<void> {
      await this.firstName.fill(firstName);
      await this.address.fill(address);
      await this.placeOrderButton.click();
    }

    async hasLoaded(): Promise<boolean> {
      return hasContentLoaded(this.cartEmptyMessage);
    }
}