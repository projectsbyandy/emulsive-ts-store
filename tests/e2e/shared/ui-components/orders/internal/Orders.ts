import { Ui, hasContentLoaded} from "@/e2e/shared/playwright-helpers";
import { IOrders } from "../IOrders";
import { Locator } from "@playwright/test";

export class Orders extends Ui implements IOrders {
  // locators
  private totalOrders: Locator = this.page.getByTestId("totalOrders");

  // operations
  async hasLoaded(): Promise<boolean> {
    return hasContentLoaded(this.totalOrders);
  }
}