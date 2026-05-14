import { OrdersToast, Section } from '@e2e-shared/models';
import {v4 as uuidv4} from 'uuid';
import { expect } from '@playwright/test';
import { uiTest } from '../fixtures/uiTest';
import { toastText } from "../shared/ui-components/common/toast";

import './hooks/afterHooks';

uiTest.describe('Ordering film tests', () => {
  uiTest('should be able to order Portra400 film', async ({ ui, loginHelper, productsHelper }) => {
    // Arrange
    await loginHelper.asTestUser();

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

  uiTest('should prompt user to login when accessing orders ', async ({ ui, page }) => {
    // Act
      await ui.navigate.To(Section.Home);
      const origin = new URL(page.url()).origin
      await page.goto(`${origin}/orders`)

    // Assert
    expect(await toastText(OrdersToast.LoginReminder, page)).toBe("Please login to continue");
  });
});