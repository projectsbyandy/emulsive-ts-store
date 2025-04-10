import { Locator, expect } from "@playwright/test";
import { ICarouselItem, IProductOverview } from "../models";
import { getProductOverviews } from "./productGrid";
import { Ui } from "./ui";
import z from 'zod';

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

  async getFeaturedProductOverviews(): Promise<IProductOverview[]> {
    const productElements = this.page.getByTestId('products').locator("a[href^='/products']");
    return await getProductOverviews(productElements, z.string().parse(process.env.PAGINATION_ITEMS_PER_PAGE));
  }

  get productsLink(): Locator {
    return this.page.locator('a[href="/products"]:text("Our Products")');
  }

  async getAllCarouselDetail(expectedImageCount: number): Promise<ICarouselItem[]> {
    const caroselImages = this.page.getByRole('group').locator('img[alt="hero"]');
    await expect(caroselImages).toHaveCount(expectedImageCount);
    
    let items: ICarouselItem[] = [];

    for (let i=0; i<expectedImageCount; i++) {
      const img = caroselImages.nth(i);
      await expect(img).toBeInViewport();
      
      const rightArrow = this.page.locator('.lucide-arrow-right');
      if(await rightArrow.isEnabled())
        await rightArrow.click();

      items.push({
        imageUrl: z.string().parse(await img.getAttribute('src')),
        visible: await img.isVisible()
      })
    }

    return items;
  }
}