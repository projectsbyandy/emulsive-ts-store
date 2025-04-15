import { Section } from "@e2e-shared/models";
import { Ui, isComponentInViewport } from "@/e2e/shared/playwright-helpers";
import { INavLinks } from "../INavLinks";

export class NavLinks extends Ui implements INavLinks {

    // locators
    
    // Operations
    async select(link: Section): Promise<void> {
      await this.page.getByTestId(`nav-link-${Section[link].toLowerCase()}`).click({timeout: 3000});
    }

    async isLinkVisible(link: Section): Promise<boolean> {
      return isComponentInViewport(this.page.getByTestId(`nav-link-${Section[link].toLowerCase()}`));      
    }
 }