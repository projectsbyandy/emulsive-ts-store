import { Locator } from "@playwright/test";

export interface ILoadVerification {
  hasLoaded(...locators: Locator[]): Promise<boolean>
}