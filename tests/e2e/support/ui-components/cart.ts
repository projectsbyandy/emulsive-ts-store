import { ILoadable } from ".";
import { Ui } from "./ui";
import { expect } from "@playwright/test";

 export class Cart extends Ui implements ILoadable {
    // locators
    private cartTitle = this.page.locator('h2[class*="capitalize"]');

    // operations
    async loaded(): Promise<void> {
      await expect(this.cartTitle).toHaveText(/Shopping Cart|Empty Cart/);
    }
 }