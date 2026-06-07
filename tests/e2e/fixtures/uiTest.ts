import { mergeTests } from "@playwright/test";
import { authHelper } from "./helpers/authHelperFixture";
import { productsHelper } from "./helpers/productsHelperFixture";
import { startTracingIfEnabled } from '../scenarios/ui/hooks/beforeHooks';
import { attachTraceOnFailureIfEnabled, attachVideoOnFailure, takeScreenshotOnFailure } from '../scenarios/ui/hooks/afterHooks';

const merged = mergeTests(authHelper, productsHelper);

export const uiTest = merged.extend<{ _tracingHooks: void }>({
  _tracingHooks: [async ({ page, context }, use, testInfo) => {
    await startTracingIfEnabled(context);

    await use(); // Executes test

    await takeScreenshotOnFailure(page, testInfo);
    await attachVideoOnFailure(page, testInfo);
    await attachTraceOnFailureIfEnabled(context, testInfo);
  }, { auto: true }],
});