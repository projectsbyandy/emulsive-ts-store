import { expect } from "@playwright/test";
import { type CarouselItem, ProductOverview } from "@e2e-shared/models";
import { getProductOverviews } from "../../common/productGrid";
import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import z from 'zod';
import { customExpect } from "@/e2e/shared/playwright-helpers/expectExtensions";
import { IHome } from "../IHome";

export class Home extends Ui implements IHome {
  // Locators
  private introContent = this.page.getByTestId('IntroContent');
  private carouselItems = this.page.getByRole('group').locator('img[alt="hero"]');
  private carouselRightArrow = this.page.locator('.lucide-arrow-right');
  private productsLink = this.page.locator('a[href="/products"]:text("Our Products")');
  private featuredProductsSection = this.page.getByTestId('products').locator("a[href^='/products']");

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
    return await getProductOverviews(this.featuredProductsSection, z.string().parse(process.env.PAGINATION_ITEMS_PER_PAGE));
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

  async loaded(): Promise<void> {
    await customExpect(this.introContent).toBeInScrolledViewPort();
    await customExpect(this.carouselRightArrow).toBeInScrolledViewPort();
  }
}