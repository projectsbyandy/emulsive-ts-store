import { uiTest } from "../fixtures";
import { Section } from "@e2e-shared/models";
import { expect } from '@playwright/test';
import './hooks/afterHooks';

uiTest.describe('Header navigation tests', () => {
  uiTest.beforeEach(async ({ui}) => {
    // Arrange
    await ui.navigate.To(Section.Home);
  });

  for (const { section } of [
      { section: Section.Home },
      { section: Section.About },
      { section: Section.Products },
      { section: Section.Cart },
  ]) {
      uiTest(`should display correct page when selecting ${Section[section]} navlink`, async ({ ui }) => {
        // Act
        await ui.header.NavLinks.select(section);
        
        // Assert
        let hasLoadedContent: boolean;
        switch (section) {
          case Section.Home:
            hasLoadedContent = await ui.home.hasLoaded();
            break;
          case Section.About:
            hasLoadedContent = await ui.about.hasLoaded();
            break;
          case Section.Products:
            hasLoadedContent = await ui.products.hasLoaded();
            break;
          case Section.Cart:
            hasLoadedContent = await ui.cart.hasLoaded();
            break;
          default:
            throw new Error(`Section: ${section} not supported in test`);
        }

        expect(hasLoadedContent).toBe(true);
      });
  }

  for (const { section } of [
      { section: Section.Checkout },
      { section: Section.Orders }
  ]) {
      uiTest(`should not display registered user link ${Section[section]}`, async ({ ui }) => {
        // Assert
        expect(await ui.header.NavLinks.isLinkVisible(section)).toBe(false);
      });
    };
  
  for (const { section } of [
      { section: Section.Checkout },
      { section: Section.Orders }
  ]) {
    uiTest(`should display ${Section[section]} link once logged in a guest user`, async ({ ui }) => {
      // Arrange
      await ui.header.UserManagement.select(Section.SignIn);
      await ui.signIn.loginAsGuest();

      // Act    
      await ui.header.NavLinks.select(section);
      
      // Assert
      switch(section){
        case Section.Checkout:
          await ui.checkout.hasLoaded();
          break;
        case Section.Orders:
          await ui.orders.hasLoaded();
          break;       
        default:
          throw new Error(`Section: ${section} not supported in test`);
      }
    });
  };
});
