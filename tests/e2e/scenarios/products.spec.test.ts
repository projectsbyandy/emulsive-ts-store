import { FilterOption, Section } from '@e2e-shared/models';
import { uiTest } from '../fixtures/uiTest';
import { z } from 'zod'
import {expect } from '@playwright/test';
import './hooks/afterHooks';

uiTest.describe('Product tests', () => {
  uiTest.beforeEach(async ({ ui }) => {
    // Arrange
    await ui.navigate.To(Section.Products);
  });

   for (const { keywordCriteria } of [
      { keywordCriteria: 'kodak' },
      { keywordCriteria: 'cinestill' },
      { keywordCriteria: 'portra' },
  ]) {
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
  };
})