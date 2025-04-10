import { test as base } from 'playwright/test';
import { Home, Products, Navigate } from '../support/ui-components';

export const uiFixtures = base.extend<{
  ui: {
    home: Home,
    navigate: Navigate,
    products: Products
  };
 }>({
  ui: async ({page}, use) => {
    await use({
      home: new Home(page),
      navigate: new Navigate(page),
      products: new Products(page)
    })
  }
});

export const uiTest = uiFixtures;