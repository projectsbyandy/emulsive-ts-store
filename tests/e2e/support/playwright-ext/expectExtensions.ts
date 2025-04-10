  import { expect as baseExpect } from '@playwright/test';

  export const customExpect = baseExpect.extend({
    async toBeInScrolledViewPort(locator) {
      await locator.isVisible();
      await locator.scrollIntoViewIfNeeded();
      await baseExpect(locator).toBeInViewport();

      return {
        pass: true,
        message: () => `Scroll and  Verify in viewport`
      };
    }
  });