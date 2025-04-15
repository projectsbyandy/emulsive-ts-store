import { uiTest } from '../fixtures';
import { FilterOption, Section } from '@e2e-shared/models';
import z from "zod";

uiTest.describe('Emulsive Store Home Page', () => {
  uiTest.beforeEach(async ({ui}) => {
    // Arrange
    await ui.navigate.To(Section.Home);
    await ui.header.UserManagement.select(Section.SignIn);
    await ui.signIn.login({email: z.string().parse(process.env.USER_EMAIL), password: z.string().parse(process.env.USER_PASSWORD)});
  });

  uiTest('should be able to order Portra400 film', async ({ ui }) => {
    await ui.home.hasLoaded();
    await ui.navigate.To(Section.Products);

    await ui.products.Filters.set([
      { option: FilterOption.Manufacturer, value: "Kodak" },
      { option: FilterOption.Format, value: "35mm" }
    ]);

    await ui.products.addToCart("Portra 400", 2);

    // search for film on products page
    // Add to cart
    // Checkout
    // Verify order is in the Orders list
  });

  uiTest.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== "passed") {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });
});