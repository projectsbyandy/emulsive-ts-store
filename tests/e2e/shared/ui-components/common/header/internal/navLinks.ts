import { Section } from "@e2e-shared/models";
import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { INavLinks } from "../INavLinks";

export class NavLinks extends Ui implements INavLinks {
    // Operations
    async select(link: Section): Promise<void> {
      await this.page.getByTestId(`nav-link-${Section[link].toLowerCase()}`).click();
    }
 }