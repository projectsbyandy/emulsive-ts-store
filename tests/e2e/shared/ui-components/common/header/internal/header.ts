import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { IHeader } from "../IHeader";
import { IUserManagement } from "../IUserManagement";
import { INavLinks } from "../INavLinks";
import { NavLinks } from "./navLinks";
import { UserManagement } from "./userManagement";
import { Page } from '@playwright/test';

export class Header extends Ui implements IHeader {

  private readonly navLinks: INavLinks;
  private readonly userManagement: IUserManagement;

  constructor(page: Page) {
    super(page);
    this.navLinks = new NavLinks(page);
    this.userManagement = new UserManagement(page);
  }

  // Locators
  public theme = this.page.getByTestId('theme');
  public cartSummaryIcon = this.page.getByTestId('cartSummaryIcon');
  
  // Sections
  get NavLinks(): INavLinks {
    return this.navLinks;
  }
  
  get UserManagement(): IUserManagement {
    return this.userManagement;
  }
 }