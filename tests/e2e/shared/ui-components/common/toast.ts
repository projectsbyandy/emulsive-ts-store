import { Page } from "@playwright/test";
import { hasContentLoaded } from "@e2e-shared/playwright-helpers";

export const hasToastAppeared = async (message: string, page: Page) : Promise<boolean> => {
  return await hasContentLoaded(page.getByRole('status').locator(`div:text("${message}")`));
}