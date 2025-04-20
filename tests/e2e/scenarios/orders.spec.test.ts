import { Section } from '@e2e-shared/models';
import {v4 as uuidv4} from 'uuid';
import { expect } from '@playwright/test';
import { uiTest } from '../fixtures/uiTest';

uiTest.describe('Ordering film tests', () => {
  uiTest.beforeEach(async ({ loginHelper }) => {
    // Arrange
    await loginHelper.asTestUser();
  });

  uiTest('should be able to order Portra400 film', async ({ ui, productsHelper }) => {
    // Arrange
    await productsHelper.addItemToCart("Portra 400", 2)
    
    // Act
    await ui.header.NavLinks.select(Section.Checkout);
    const orderName = `andy - ${uuidv4()}`;
    await ui.checkout.placeOrder(orderName, "12 Barney Road, Teddington, London KT1 4DL");
  
    // Assert
    await ui.header.NavLinks.select(Section.Orders);
    const order = await ui.orders.getOrder(orderName)
    expect(order.productCount).toStrictEqual(2);
    const oneMinAgo = new Date(new Date().getTime() - 60 * 1000).getTime();
    expect(order.purchased.getTime()).toBeGreaterThan(oneMinAgo);
  });

  uiTest.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== "passed") {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });
});