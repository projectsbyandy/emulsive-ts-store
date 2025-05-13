import { expect } from "@playwright/test";
import { type CarouselItem, ProductOverview } from "@e2e-shared/models";
import { getProductOverviews } from "../../common/productGrid";
import z from 'zod';
import { IHome } from "../IHome";
import { hasContentLoaded, Ui } from "@/e2e/shared/playwright-helpers";

export class Home extends Ui implements IHome {
  // Locators
  private readonly introContent = this.page.getByTestId('IntroContent');
  private readonly carouselItems = this.page.getByRole('group').locator('img[alt="hero"]');
  private readonly carouselRightArrow = this.page.locator('.lucide-arrow-right');
  private readonly productsLink = this.page.locator('a[href="/products"]:text("Our Products")');
  private readonly products = this.page.getByTestId('products').locator("a[href^='/products']");

  // Operations
  async getIntroContent() : Promise<{ heading: string; introBody: string }> {
    const heading = await this.introContent.locator('h1').innerText();
      const introBody = await this.introContent.locator('p').innerText();

    return {
      heading,
      introBody
    };
  }

  async getFeaturedProductOverviews(): Promise<ProductOverview[]> {
    await expect(this.products.last()).toBeVisible();
    return await getProductOverviews(this.page);
  }

  async getAllCarouselDetail(expectedImageCount: number): Promise<CarouselItem[]> {
    await expect(this.carouselItems).toHaveCount(expectedImageCount);
    
    let items: CarouselItem[] = [];

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

  async selectProductLink():  Promise<void> {
    await this.productsLink.click();
  }

  async hasLoaded(): Promise<boolean> {
    return hasContentLoaded(this.introContent, this.carouselRightArrow);  
  }
}