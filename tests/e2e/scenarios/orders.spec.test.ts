import { uiTest } from '../fixtures';
import { FilterOption, Section } from '@e2e-shared/models';
import z from "zod";
import {v4 as uuidv4} from 'uuid';
import { expect } from '@playwright/test';

uiTest.describe('Emulsive Store Home Page', () => {
  uiTest.beforeEach(async ({ui}) => {
    // Arrange
    await ui.navigate.To(Section.Home);
    await ui.header.UserManagement.select(Section.SignIn);
    await ui.signIn.login({email: z.string().parse(process.env.USER_EMAIL), password: z.string().parse(process.env.USER_PASSWORD)});
  });

  uiTest('should be able to order Portra400 film', async ({ ui }) => {
    // Arrange
    await ui.home.hasLoaded();
    await ui.navigate.To(Section.Products);

    // Act
    await ui.products.Filters.set([
      { option: FilterOption.Manufacturer, value: "Kodak" },
      { option: FilterOption.Format, value: "35mm" }
    ]);
    
    await ui.products.addToCart("Portra 400", 2);
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