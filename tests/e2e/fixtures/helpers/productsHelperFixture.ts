import { FilterOption, Section } from "@/e2e/shared/models";
import { uiFixture } from "../uiTestFixture";

export const productsHelper = uiFixture.extend<{
  productsHelper: {
    addItemToCart(productName: string, items: number): Promise<void>;
  }
}>({
  productsHelper: async ({ ui }, use) => {
    const productHelper = {
      async addItemToCart(productName: string, items: number): Promise<void> {
        await ui.navigate.To(Section.Products);
        await ui.products.Filters.set([
            { option: FilterOption.Keyword, value: productName },
          ]);
          
        await ui.products.select(productName);
        await ui.products.Details.addQuantityToCart(items);
      }
    }

    await use(productHelper);
  }
})