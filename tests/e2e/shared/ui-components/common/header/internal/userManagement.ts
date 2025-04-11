import { Section } from "@e2e-shared/models";
import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { IUserManagement } from "../IUserManagement";

export class UserMangement extends Ui implements IUserManagement {
  // Locators
  public loginLink = this.page.locator('a[href="/login"]:text("log in / Guest');    
  public registerLink = this.page.locator('a[href="/register"]:text("register")');

  // Operations
  async select(link: Section): Promise<void> {
    await this.page.getByTestId(`nav-link-${Section[link].toLowerCase()}`).click();
  }
}