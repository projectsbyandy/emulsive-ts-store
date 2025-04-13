import { Section } from "@e2e-shared/models";
import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { INavLinks } from "../INavLinks";
import { expect } from '@playwright/test';

export class NavLinks extends Ui implements INavLinks {

    // locators
    
    // Operations
    async select(link: Section): Promise<void> {
      await this.page.getByTestId(`nav-link-${Section[link].toLowerCase()}`).click({timeout: 3000});
    }

    async isLinkVisible(link: Section): Promise<boolean> {
      try {
        await expect(this.page.getByTestId(`nav-link-${Section[link].toLowerCase()}`)).not.toBeInViewport({timeout: 3000});
        return false;
      } catch(error) {
        return true;
      }
    }
 }