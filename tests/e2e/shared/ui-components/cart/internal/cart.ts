import { Ui } from "@/e2e/shared/playwright-helpers/Ui";
import { expect } from "@playwright/test";
import { ICart } from "../ICart";

 export class Cart extends Ui implements ICart {
    // locators
    private readonly cartTitle = this.page.locator('h2[class*="capitalize"]:has-text("Cart")');
    
    // operations
    async hasLoaded(): Promise<boolean> {
      await expect(this.cartTitle).toHaveText(/Shopping Cart|Empty Cart/);
      return true;
    }
 }