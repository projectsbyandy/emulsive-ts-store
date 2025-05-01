  import { chromium } from "@playwright/test";
  import { z } from 'zod';

  async function performHealthCheck(): Promise<void> {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const url = z.string().parse(process.env.EMULSIVE_STORE_URL);

    try {
      const response = await page.goto(url, { timeout: 5000 });
      if (!response || response.status() !== 200) {
        throw new Error(`Health check failed: ${url} is not accessible (Status: ${response?.status()})`);
      }
      console.log(`Health check passed: ${url} is accessible`);
    } catch (error) {
      console.log(`Health check failed: ${url} is not accessible`);
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
    await performHealthCheck();
    console.log("Global setup completed!");
  }