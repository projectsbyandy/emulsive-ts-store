import { expect } from "@playwright/test";
import { ICarouselItem, IProductOverview } from "../models";
import { getProductOverviews } from "./productGrid";
import { Ui } from "./ui";
import z from 'zod';
import { ILoadable } from ".";
import { customExpect } from "../playwright-ext/expectExtensions";

export class Home extends Ui implements ILoadable {
  // Locators
  private introContent = this.page.getByTestId('IntroContent');
  private carouselItems = this.page.getByRole('group').locator('img[alt="hero"]');
  private carouselRightArrow = this.page.locator('.lucide-arrow-right');
  public productsLink = this.page.locator('a[href="/products"]:text("Our Products")');
  public featuredProductsSection = this.page.getByTestId('products').locator("a[href^='/products']");

  // Operations
  async getIntroContent() {
    const heading = await this.introContent.locator('h1').innerText();
      const introBody = await this.introContent.locator('p').innerText();

    return {
      heading,
      introBody
    };
  }

  async getFeaturedProductOverviews(): Promise<IProductOverview[]> {
    return await getProductOverviews(this.featuredProductsSection, z.string().parse(process.env.PAGINATION_ITEMS_PER_PAGE));
  }

  async getAllCarouselDetail(expectedImageCount: number): Promise<ICarouselItem[]> {
   
    await expect(this.carouselItems).toHaveCount(expectedImageCount);
    
    let items: ICarouselItem[] = [];

    for (let i=0; i<expectedImageCount; i++) {
      const img = this.carouselItems.nth(i);
      await expect(img).toBeInViewport();
      
      if(await this.carouselRightArrow.isEnabled())
        await this.carouselRightArrow.click();

      items.push({
        imageUrl: z.string().parse(await img.getAttribute('src')),
        visible: await img.isVisible()
      })
    }

    return items;
  }

  async loaded(): Promise<void> {
    await customExpect(this.introContent).toBeInScrolledViewPort();
    await customExpect(this.carouselRightArrow).toBeInScrolledViewPort();
  }
}