import { ProductOverview } from "../types"
import {expect, Locator } from '@playwright/test';
import z from 'zod';

export const getProductOverviews = async (source: Locator) : Promise<ProductOverview[]> => {
   let productOverviews : ProductOverview[] = [];

   let productCount = 0;
   let retries = 0;

   while(productCount === 0 && retries <= 3) {
       productCount = await source.count();
       retries++;
       console.log('Retrying');
   }

   for(let i=0; i<productCount; i++) {
      await expect(source.nth(i).locator('div img')).toBeVisible();

      const product = source.nth(i);
      const productOverview : ProductOverview = {
         imageUrl: z.string().parse(await product.locator("div img").getAttribute("src")),
         name: z.string().parse(await product.locator("h2").textContent()),
         priceWithCurrency: z.string().parse(await product.locator("div p").textContent())
      }
      productOverviews.push(productOverview)
   }

   return productOverviews;
}