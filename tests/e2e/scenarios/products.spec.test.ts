import { FilterOption, Section } from '@e2e-shared/models';
import { uiTest } from '../fixtures/uiTest';

uiTest.describe('Product tests', () => {
  uiTest.beforeEach(async ({ ui }) => {
    // Arrange
    await ui.navigate.To(Section.Products);
  });

  uiTest('should return results relevant to keyword filter', async ({ ui }) => {
    // Arrange
    const searchCriteria: string = "kodak"

    // Act
    await ui.products.Filters.set([
      { option: FilterOption.Keyword, value: searchCriteria },
    ]);
    
    // Assert
    // Get all products returned from search and verify keyword is present in all products (looking at fields)
  });

  uiTest.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== "passed") {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });
});