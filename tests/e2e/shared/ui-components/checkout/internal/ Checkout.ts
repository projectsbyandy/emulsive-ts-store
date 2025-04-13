import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { ICheckout } from "../ICheckout";
import { Locator } from "@playwright/test";
import { customExpect } from "@/e2e/shared/playwright-helpers/expectExtensions";

 export class Checkout extends Ui implements ICheckout {
    // locators
    private cartEmptyMessage: Locator = this.page.locator('h2[class*="capitalize"]:has-text("Your Cart is Empty")');
  
    // operations
    async loaded(): Promise<void> {
      await customExpect(this.cartEmptyMessage).toBeInScrolledViewPort();
    }
}