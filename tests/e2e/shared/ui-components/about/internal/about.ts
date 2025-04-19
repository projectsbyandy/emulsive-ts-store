import { IAbout } from "../IAbout";
import { hasContentLoaded, Ui} from "@/e2e/shared/playwright-helpers";

 export class About extends Ui implements IAbout {
  // locators
  private readonly title = this.page.getByTestId('about-title');
  private readonly description = this.page.getByTestId('about-description');

  // operations
  async hasLoaded(): Promise<boolean> {
    return hasContentLoaded(this.title, this.description);
  }
 }