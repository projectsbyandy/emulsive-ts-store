import { ProductOverview } from "../models";
import { getProductOverviews } from "./productGrid";
import { Ui } from "./ui";

export class Home extends Ui {

  async getIntroContent() {
      const introContent = this.page.getByTestId('IntroContent');
      const heading = await introContent.locator('h1').innerText();
      const introBody = await introContent.locator('p').innerText();

    return {
      heading,
      introBody
    };
  }

  async getFeaturedProductOverviews(): Promise<ProductOverview[]> {
    const productElements = this.page.getByTestId('products').locator("a[href^='/products']");
    return await getProductOverviews(productElements);
  }
}