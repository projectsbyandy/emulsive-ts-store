import { ICheckout } from "../ICheckout";
import { Locator } from "@playwright/test";
import { hasContentLoaded, Ui } from "@/e2e/shared/playwright-helpers";

 export class Checkout extends Ui implements ICheckout {
    // locators
    private cartEmptyMessage: Locator = this.page.locator('h2[class*="capitalize"]:has-text("Your Cart is Empty")');
  
    // operations
    async hasLoaded(): Promise<boolean> {
      return hasContentLoaded(this.cartEmptyMessage);
    }
}