import { test as base } from 'playwright/test';
import { IHome, IProducts, INavigate, IHeader, ICart, IAbout, ISignIn, ICheckout, IOrders } from '@e2e-shared/ui-components';
import { Home, Products, Navigate, Header, Cart, About, SignIn, Checkout, Orders } from '@e2e-shared/ui-components';

export const uiFixture = base.extend<{
  ui: {
    home: IHome,
    navigate: INavigate,
    products: IProducts,
    header: IHeader,
    about: IAbout,
    cart: ICart,
    checkout: ICheckout,
    orders: IOrders,
    signIn: ISignIn
  };
 }>({
  ui: async ({page}, use) => {
    await use({
      home: new Home(page),
      navigate: new Navigate(page),
      products: new Products(page),
      header: new Header(page),
      about: new About(page),
      cart: new Cart(page),
      checkout: new Checkout(page),
      orders: new Orders(page),
      signIn: new SignIn(page)
    })
  }
});