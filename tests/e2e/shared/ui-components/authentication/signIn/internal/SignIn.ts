import { User } from "@e2e-shared/models";
import { ISignIn } from "../ISignIn";
import { Locator } from "@playwright/test";
import { hasContentLoaded, Ui } from "@/e2e/shared/playwright-helpers";

export class SignIn extends Ui implements ISignIn{
  // locators
  private asGuestUser: Locator = this.page.locator('//button[text()="Guest User"]')
  private email: Locator = this.page.locator('input[type="email"]');
  private password: Locator = this.page.locator('input[type="password"]');
  private loginButton: Locator = this.page.getByRole('button', {name: 'Login'});

  // operations
  async loginAsGuest(): Promise<void> {
    await this.asGuestUser.click();
  }

  async login(user: User): Promise<void> {
      await this.email.fill(user.email ?? "");
      await this.password.fill(user.password ?? "");
      await this.loginButton.click();
  }
  
  async hasLoaded(): Promise<boolean> {
     return hasContentLoaded(this.asGuestUser, this.loginButton);
  }
}