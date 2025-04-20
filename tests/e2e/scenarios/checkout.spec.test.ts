import { Section } from "@e2e-shared/models";
import { expect } from '@playwright/test';
import { hasToastAppeared } from "@e2e-shared/ui-components/common/toast";
import { uiTest } from "../fixtures";

uiTest.describe('Checkout tests', () => {
  uiTest.beforeEach(async ({ui, loginHelper, productsHelper }) => {
    // Arrange
    await loginHelper.asTestUser();
    await productsHelper.addItemToCart("Portra 400", 2);
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