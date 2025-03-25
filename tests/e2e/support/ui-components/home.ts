import { Page } from "playwright/test";
import { Ui } from "./ui";

export class Home extends Ui {
  constructor(page: Page) {
    super(page);
  }

  async getIntroContent() {
      const introContent = this.page.getByTestId('IntroContent');
      const heading = await introContent.locator('h1').innerText();
      const introBody = await introContent.locator('p').innerText();

    return {
      heading,
      introBody
    };
  }
}