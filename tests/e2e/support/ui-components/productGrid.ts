import {expect, Locator } from '@playwright/test';
import z from 'zod';
import { ProductOverview } from '../models';

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