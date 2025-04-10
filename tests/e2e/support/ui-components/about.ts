import { ILoadable } from ".";
import { customExpect } from "../playwright-ext/expectExtensions";
import { Ui } from "./ui";

 export class About extends Ui implements ILoadable {
  // locators
  private title = this.page. getByTestId('about-title');
  private description = this.page. getByTestId('about-description');

  // operations
  async loaded(): Promise<void> {
    await customExpect(this.title).toBeInScrolledViewPort();
    await customExpect(this.description).toBeInScrolledViewPort();
  }
 }