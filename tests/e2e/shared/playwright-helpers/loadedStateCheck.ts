import { Locator } from "@playwright/test";
import { customExpect } from "./expectExtensions";
import { expect } from '@playwright/test';

export const hasContentLoaded = async (...components: Locator[]): Promise<boolean> => {
  for (const component of components) {
    try {
      await customExpect(component).toBeInScrolledViewPort();
    } catch (error) {
      console.error("Not loaded due to: ", error);
      return false;
    }
  }
  return true;
}

export const isComponentInViewport = async(locator: Locator) => {
  try {
      await expect(locator).not.toBeInViewport({timeout: 3000});
      return false;
    } catch(error) {
      return true;
    }
}