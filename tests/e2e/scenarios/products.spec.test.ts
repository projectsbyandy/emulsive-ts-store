import { FilterOption, Section } from '@e2e-shared/models';
import { uiTest } from '../fixtures/uiTest';
import { z } from 'zod'
import {expect } from '@playwright/test';

uiTest.describe('Product tests', () => {
  uiTest.beforeEach(async ({ ui }) => {
    // Arrange
    await ui.navigate.To(Section.Products);
  });

  [
    { keywordCriteria: 'kodak' },
    { keywordCriteria: 'cinestill' },
    { keywordCriteria: 'portra' },
  ].forEach(({ keywordCriteria }) => {
    uiTest(`should return results relevant to keyword: ${keywordCriteria} filter`, async ({ ui }) => {
      // Arrange / Act
      await ui.products.Filters.set([
        { option: FilterOption.Keyword, value: keywordCriteria },
      ]);
      
      // Assert
      const filteredProducts = await ui.products.getProductsOverview();

      for (let product of filteredProducts) {
        const detail = await (await ui.products.select(z.number().parse(product.id))).details();

        expect(detail.name.toLocaleLowerCase().includes(keywordCriteria) 
        || detail.manufacturer.toLocaleLowerCase().includes(keywordCriteria) 
        || detail.description.toLocaleLowerCase().includes(keywordCriteria)).toBe(true);
      };
    });
  });

  uiTest.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== "passed") {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });
})