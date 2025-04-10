import { test as base } from 'playwright/test';
import { Home, Products, Navigate, Header, About, Cart } from '../support/ui-components';

const uiFixtures = base.extend<{
  ui: {
    home: Home,
    navigate: Navigate,
    products: Products,
    header: Header,
    about: About,
    cart: Cart
  };
 }>({
  ui: async ({page}, use) => {
    await use({
      home: new Home(page),
      navigate: new Navigate(page),
      products: new Products(page),
      header: new Header(page),
      about: new About(page),
      cart: new Cart(page)
    })
  }
});

export const uiTest = uiFixtures;