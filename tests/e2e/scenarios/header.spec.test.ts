import { uiTest } from "../fixtures";
import { Section } from "@e2e-shared/models";

uiTest.describe('Header navigation tests', () => {
  uiTest.beforeEach(async ({ui}) => {
    await ui.navigate.To(Section.Home);
  });

  [
    { section: Section.Home },
    { section: Section.About },
    { section: Section.Products },
    { section: Section.Cart },
  ].forEach(({ section }) => {
    uiTest(`should display correct page when selecting ${Section[section]} navlink`, async ({ui}) => {
      await ui.header.NavLinks.select(section);
      
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
      }
    });
  });
});
