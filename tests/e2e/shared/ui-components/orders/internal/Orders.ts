import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { customExpect } from "@/e2e/shared/playwright-helpers/expectExtensions";
import { IOrders } from "../IOrders";
import { Locator } from "@playwright/test";

export class Orders extends Ui implements IOrders {
  // locators
  private totalOrders: Locator = this.page.getByTestId("totalOrders");

  // operations
  async loaded(): Promise<void> {
    await customExpect(this.totalOrders).toBeInScrolledViewPort();
  }
}