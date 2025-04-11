import {expect, Locator } from '@playwright/test';
import z from 'zod';
import { type ProductOverview } from '@e2e-shared/models';

export const getProductOverviews = async (source: Locator, expCount: string|number) : Promise<ProductOverview[]> => {
   let productOverviews : ProductOverview[] = [];

   let productCount = 0;
   const expectedCount = (typeof expCount === 'string' ? Number(expCount) : expCount);

   await expect(source).toHaveCount(expectedCount)
   productCount = await source.count();

   for(let i=0; i<productCount; i++) {
      await expect(source.nth(i).locator('div img')).toBeVisible();

      const product = source.nth(i);
      const productDetailUrl = z.string().parse(await product.getAttribute('href'));

      const productOverview : ProductOverview = {
         id: z.number().parse(Number(await SelectIdFromProductDetailUrl(productDetailUrl))),
         imageUrl: z.string().parse(await product.locator("div img").getAttribute("src")),
         name: z.string().parse(await product.locator("h2").textContent()),
         detailsUrlPart:  z.string().parse(productDetailUrl),
         priceWithCurrency: z.string().parse(await product.locator("div p").textContent())
      }
      productOverviews.push(productOverview)
   }

   return productOverviews;
}

const SelectIdFromProductDetailUrl = async (productUrl: string): Promise<string> => {

   const regex = /products\/(\d+)/;
   const match = productUrl.match(regex);

   if (match) {
      return match[1];
   } else {
      throw new Error('Unable to extract id from Product url')
   }
}