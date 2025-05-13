import { Section } from "@e2e-shared/models";
import { expect } from '@playwright/test';
import { hasToastAppeared } from "@e2e-shared/ui-components/common/toast";
import { uiTest } from "../fixtures";
import './hooks/afterHooks';

uiTest.describe('Checkout tests', () => {
  uiTest.beforeEach(async ({ui, loginHelper, productsHelper }) => {
    // Arrange
    await loginHelper.asTestUser();
    await productsHelper.addItemToCart("Portra 400", 2);
    await ui.header.NavLinks.select(Section.Checkout);
  });

  for (const { name, address } of [
    { name: "", address: "" },
      { name: "Peter", address: "" },
      { name: "", address: "12 Letby road" }
    ]) {
      uiTest(`Should display error message when creating an order with invalid values: ${name} ${address}`, async ({ ui, page }) => {
      // Act
      await ui.checkout.placeOrder(name, address);
      
      // Assert
      expect(await hasToastAppeared("Please complete all fields", page)).toBe(true);
      });
  };
});