import z from 'zod';
import { type ProductOverview } from '@e2e-shared/models';
import { customExpect } from '@e2e-shared/playwright-helpers';
import { Page } from '@playwright/test';

export const getProductOverviews = async (page: Page): Promise<ProductOverview[]> => {
  const productSelector = '[data-testid="products"] a[href^="/products"]';
  const productLocator = page.locator(productSelector).filter({ visible: true });
  
  await page.waitForSelector(productSelector, { state: 'visible' });

  const productOverviews: ProductOverview[] = [];
  const productCount = await productLocator.count();

  for (let i = 0; i < productCount; i++) {
    const product = productLocator.nth(i);   
    await product.scrollIntoViewIfNeeded({timeout: 8000});
    await customExpect(
      product.locator('div img')
    ).toBeInScrolledViewPort(8000);

    const productDetailUrl = z.string().parse(await product.getAttribute('href'));

    const [imageUrl, name, priceWithCurrency] = await Promise.all([
      product.locator('div img').getAttribute('src'),
      product.locator('h2').textContent(),
      product.locator('div p').textContent()
    ]);

    const productOverview: ProductOverview = {
      id: z.number().parse(Number(await SelectIdFromProductDetailUrl(productDetailUrl))),
      imageUrl: z.string().parse(imageUrl),
      name: z.string().parse(name),
      detailsUrlPart: z.string().parse(productDetailUrl),
      priceWithCurrency: z.string().parse(priceWithCurrency)
    };

    productOverviews.push(productOverview);
  }

  return productOverviews;
};


const SelectIdFromProductDetailUrl = async (productUrl: string): Promise<string> => {
   const regex = /products\/(\d+)/;
   const match = productUrl.match(regex);

   if (match) {
      return match[1];
   } else {
      throw new Error('Unable to extract id from Product url')
   }
}