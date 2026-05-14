import { Page } from "@playwright/test";
import { hasContentLoaded } from "@e2e-shared/playwright-helpers";

export const hasToastAppeared = async (testIdPrefix: string, page: Page) : Promise<boolean> => {
  return await hasContentLoaded(page.locator(`[data-testid^="${testIdPrefix}"]`).first());
}

export const toastText = async (testIdPrefix: string, page: Page) : Promise<string> => {
  const toast = page.locator(`[data-testid^="${testIdPrefix}"]`).first();
  if (await hasToastAppeared(testIdPrefix, page) === false) {
    throw new Error(`Toast with testIdPrefix ${testIdPrefix} has not found`);
  }

  const text = await toast.textContent()
  if (!text?.trim()) {
    throw new Error(`Toast with testIdPrefix ${testIdPrefix} has no text content`)
  }

  return text.trim();
}

export const dismissToast = async (testIdPrefix: string, page: Page) : Promise<void> => {
  const toast = page.getByTestId(`${testIdPrefix}-close-button`).first();
  if (await hasToastAppeared(testIdPrefix, page) === false) {
    throw new Error(`Toast with testIdPrefix ${testIdPrefix} has not found`);
  }

  await toast.click();
}
