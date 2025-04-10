import { Section } from "../models";
import { Ui } from "./ui";

 export class Header extends Ui {
  // Locators
  public theme = this.page.getByTestId('theme');
  public cartSummaryIcon = this.page.getByTestId('cartSummaryIcon');
  
  // Sections
  get NavLinks() {
    return new NavLinks(this.page);
  }
  
  get UserManagement() {
    return new UserMangement(this.page);
  }

 }

 class NavLinks extends Ui {
    // Operations
    async select(link: Section): Promise<void> {
      await this.page.getByTestId(`nav-link-${Section[link].toLowerCase()}`).click();
    }
 }

 class UserMangement extends Ui {
    // Locators
    public loginLink = this.page.locator('a[href="/login"]:text("log in / Guest');    
    public registerLink = this.page.locator('a[href="/register"]:text("register")');

    // Operations
    async select(link: Section): Promise<void> {
      await this.page.getByTestId(`nav-link-${Section[link].toLowerCase()}`).click();
    }
 }