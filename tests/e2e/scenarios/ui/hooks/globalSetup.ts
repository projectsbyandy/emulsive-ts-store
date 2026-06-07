import { testConfig } from "@/e2e/shared/models/testConfig";
import { chromium } from "@playwright/test";

async function performHealthCheck(): Promise<void> {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const url = testConfig.emulsiveStoreUrl;

  try {
    const response = await page.goto(url, { timeout: 5000 });
    if (!response || response.status() !== 200) {
      throw new Error(`Health check failed: ${url} is not accessible (Status: ${response?.status()})`);
    }
    console.log(`\u2713 Health check passed: ${url} is accessible`);
  } catch (error) {
    console.error(`Health check failed: ${url} is not accessible`);
    console.error(error);
    process.exit(1);
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

export default async function globalSetup(): Promise<void> {
  console.log("Running global setup...");
  console.log(`Environment in Test: ${testConfig.envInTest}`);
  console.log(`UI URL in Test (note possible local overrides): ${testConfig.emulsiveStoreUrl}`);
  await performHealthCheck();
  console.log("Global setup completed!");
}