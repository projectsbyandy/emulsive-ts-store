import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { IHeader } from "../IHeader";
import { IUserManagement } from "../IUserManagement";
import { INavLinks } from "../INavLinks";
import { NavLinks } from "./navLinks";
import { UserMangement } from "./userManagement";

 export class Header extends Ui implements IHeader{
  // Locators
  public theme = this.page.getByTestId('theme');
  public cartSummaryIcon = this.page.getByTestId('cartSummaryIcon');
  
  // Sections
  get NavLinks(): INavLinks {
    return new NavLinks(this.page);
  }
  
  get UserManagement(): IUserManagement {
    return new UserMangement(this.page);
  }
 }