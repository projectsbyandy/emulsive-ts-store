import { Section } from "@e2e-shared/models";
import { Ui } from "@/e2e/shared/playwright-helpers/Ui";
import { IUserManagement } from "../IUserManagement";

export class UserManagement extends Ui implements IUserManagement {
  // Locators
  public readonly signInLink = this.page.locator('a[href="/login"]:text("Sign in / Guest")');    
  public readonly registerLink = this.page.locator('a[href="/register"]:text("register")');
  public readonly logoutLink = this.page.locator('//button[text()="Logout"]');

  // Operations
  async select(link: Section): Promise<void> {
    switch(link) {
      case Section.SignIn:
        await this.signInLink.click();
        break;
      case Section.Register:
        await this.registerLink.click();
         break;
      case Section.Logout:
        await this.logoutLink.click();
    }
  }
}