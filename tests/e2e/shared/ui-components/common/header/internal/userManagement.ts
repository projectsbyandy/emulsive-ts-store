import { Section } from "@e2e-shared/models";
import { Ui } from "@/e2e/shared/playwright-helpers/Ui";
import { IUserManagement } from "../IUserManagement";

export class UserManagement extends Ui implements IUserManagement {
  // Locators
  public readonly signInLink = this.page.getByTestId('login');  
  public readonly registerLink = this.page.getByTestId('register');
  public readonly logoutLink = this.page.getByTestId('logout');
  public readonly greeting = this.page.getByTestId('greeting');

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

  async isDisplayed(link: Section): Promise<boolean> {
    switch(link) {
      case Section.SignIn:
        return await this.signInLink.isVisible();
      case Section.Register:
        return await this.registerLink.isVisible();
      case Section.Logout:
        return await this.logoutLink.isVisible();
      default:
        return false;
    }
  };

  async getGreetingText(): Promise<string> {
    return await this.greeting.textContent() ?? '';
  }
}