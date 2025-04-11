import { customExpect } from "@/e2e/shared/playwright-helpers/expectExtensions";
import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { IAbout } from "../IAbout";

 export class About extends Ui implements IAbout {
  // locators
  private title = this.page. getByTestId('about-title');
  private description = this.page. getByTestId('about-description');

  // operations
  async loaded(): Promise<void> {
    await customExpect(this.title).toBeInScrolledViewPort();
    await customExpect(this.description).toBeInScrolledViewPort();
  }
 }