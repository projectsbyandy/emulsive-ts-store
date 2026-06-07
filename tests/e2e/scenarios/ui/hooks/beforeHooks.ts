import { testConfig } from "@/e2e/shared/models";
import { BrowserContext } from "@playwright/test";

export async function startTracingIfEnabled(context: BrowserContext) {
  if (testConfig.tracingEnabled) {
    context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true,
      });
  }
}