import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { expect } from "@playwright/test";
import { ICart } from "../ICart";

 export class Cart extends Ui implements ICart {
    // locators
    private cartTitle = this.page.locator('h2[class*="capitalize"]:has-text("Cart")');

    // operations
    async loaded(): Promise<void> {
      await expect(this.cartTitle).toHaveText(/Shopping Cart|Empty Cart/);
    }
 }