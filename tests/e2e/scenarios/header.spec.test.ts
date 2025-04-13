import { uiTest } from "../fixtures";
import { Section } from "@e2e-shared/models";
import { expect } from '@playwright/test';

uiTest.describe('Header navigation tests', () => {
  uiTest.beforeEach(async ({ui}) => {
    // Arrange
    await ui.navigate.To(Section.Home);
  });

  [
    { section: Section.Home },
    { section: Section.About },
    { section: Section.Products },
    { section: Section.Cart },
  ].forEach(({ section }) => {
    uiTest(`should display correct page when selecting ${Section[section]} navlink`, async ({ ui }) => {
      // Act
      await ui.header.NavLinks.select(section);
      
      // Assert
      switch(section){
        case Section.Home:
          await ui.home.loaded();
          break;
        case Section.About:
          await ui.about.loaded();
          break;
        case Section.Products:
          await ui.products.loaded();
          break;
        case Section.Cart:
          await ui.cart.loaded();
          break;
        default:
          throw new Error(`Section: ${section} not supported in test`);
      }
    });
  });

  [
    { section: Section.Checkout },
    { section: Section.Orders }
  ].forEach(({ section }) => {
    uiTest(`should not display registered user link ${Section[section]}`, async ({ ui }) => {
      // Assert
      expect(await ui.header.NavLinks.isLinkVisible(section)).toBe(false);
    });
  });

  [
    { section: Section.Checkout },
    { section: Section.Orders }
  ].forEach(({ section }) => {
    uiTest(`should display ${Section[section]} link once logged in a guest user`, async ({ ui }) => {
      // Arrange
      await ui.header.UserManagement.select(Section.SignIn);
      await ui.signIn.loginAsGuest();

      // Act    
      await ui.header.NavLinks.select(section);
      // Assert
      switch(section){
        case Section.Checkout:
          await ui.checkout.loaded();
          break;
        case Section.Orders:
          await ui.orders.loaded();
          break;       
        default:
          throw new Error(`Section: ${section} not supported in test`);
      }
    });
  });
});
