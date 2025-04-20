import { uiTest } from "../fixtures";
import { FilterOption, Section } from "@e2e-shared/models";
import z from 'zod'
import { hasToastAppeared } from "../shared/ui-components/common/Toast";
import { expect } from '@playwright/test';

uiTest.describe('Checkout tests', () => {
  uiTest.beforeEach(async ({ui}) => {
    // Arrange
    await ui.navigate.To(Section.Home);
    await ui.header.UserManagement.select(Section.SignIn);
    await ui.signIn.login({email: z.string().parse(process.env.USER_EMAIL), password: z.string().parse(process.env.USER_PASSWORD)});
    await ui.home.hasLoaded();
    await ui.navigate.To(Section.Products);
  
    await ui.products.Filters.set([
      { option: FilterOption.Manufacturer, value: "Kodak" },
      { option: FilterOption.Format, value: "35mm" }
    ]);
  
    await ui.products.addToCart("Portra 400", 2);
    await ui.header.NavLinks.select(Section.Checkout);
  });

  [
    { name: "", address: "" },
    { name: "Peter", address: "" },
    { name: "", address: "12 Letby road" }
  ].forEach(({ name, address }) => {
    uiTest(`Should display error message when creating an order with invalid values: ${name} ${address}`, async ({ ui, page }) => {
      // Act
      await ui.checkout.placeOrder(name, address);
      
      // Assert
      expect(await hasToastAppeared("Please complete all fields", page)).toBe(true);
    });
  });
  
  uiTest.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== "passed") {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });
});