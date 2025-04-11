  import { expect as baseExpect } from '@playwright/test';

  export const customExpect = baseExpect.extend({
    async toBeInScrolledViewPort(locator, timeout = 5000) {
      const options = { timeout };

      try {
        await baseExpect(locator).toBeVisible(options);
        await locator.scrollIntoViewIfNeeded(options);
        await baseExpect(locator).toBeInViewport(options);
        return {
          pass: true,
          message: () => `Scrolled and verified in viewport`
        };  
      } catch(error) {
        return {
          pass: false,
          message: () => `Failed to verify: Element was not scrolled and verified the viewport within ${timeout}ms.`,
        };
      }
    }
  });