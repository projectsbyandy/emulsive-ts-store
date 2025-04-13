import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { ISignIn } from "../ISignIn";
import { Locator } from "@playwright/test";
import { customExpect } from "@/e2e/shared/playwright-helpers/expectExtensions";

export class SignIn extends Ui implements ISignIn{
  // locators
  private asGuestUser: Locator = this.page.locator('//button[text()="Guest User"]')

  // operations
  async loginAsGuest(): Promise<void> {
    await this.asGuestUser.click();
  }
  
  async loaded(): Promise<void> {
    await customExpect(this.asGuestUser).toBeInScrolledViewPort();
  }
  
}