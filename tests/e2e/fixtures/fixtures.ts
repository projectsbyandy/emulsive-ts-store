import { test as base } from 'playwright/test';
import { IHome, IProducts, INavigate, IHeader, ICart, IAbout } from '@e2e-shared/ui-components';
import { Home, Products, Navigate, Header, Cart, About } from '@e2e-shared/ui-components';
const uiFixtures = base.extend<{
  ui: {
    home: IHome,
    navigate: INavigate,
    products: IProducts,
    header: IHeader,
    about: IAbout,
    cart: ICart
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