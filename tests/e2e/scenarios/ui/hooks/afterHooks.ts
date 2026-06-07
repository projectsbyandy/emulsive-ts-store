import fs from 'fs';
import { testConfig } from "@/e2e/shared/models";
import { BrowserContext, Page, TestInfo } from '@playwright/test';

export async function takeScreenshotOnFailure(page :Page, testInfo: TestInfo) {
    if (testInfo.status !== "passed") {
        const screenshotsDir = createAssetDirectoryIfNotExists(testInfo, "screenshots");
        const screenshot = await page.screenshot({ path: `${screenshotsDir}/${testInfo.title.replace(" ", "-")} - ${new Date().getTime()}.png` });
        testInfo.attach(testInfo.title, {
            body: screenshot,
            contentType: 'image/png',
        });
    }
};

export async function attachVideoOnFailure(page: Page, testInfo: TestInfo) {
    if (testInfo.status !== "passed") {
        const videoPath = await page.video()?.path();
        if (videoPath) {
            const videosDir = createAssetDirectoryIfNotExists(testInfo, "videos");
            const destPath = `${videosDir}/${testInfo.title.replace(" ", "-")} - ${new Date().getTime()}.webm`;
            fs.copyFileSync(videoPath, destPath);
            testInfo.attach('Failure Video', { path: destPath, contentType: 'video/webm' });
        }
    }
};

export async function attachTraceOnFailureIfEnabled(context: BrowserContext, testInfo: TestInfo) {
    if (!testConfig.tracingEnabled) return;

    if (testInfo.status !== "passed") {
        const tracesDir = createAssetDirectoryIfNotExists(testInfo, "traces");
        const assetDetails = `${testInfo.title.replace(" ", "-")}  - ${new Date().getTime()}`;
        await context.tracing.stop({
            path: `${tracesDir}/${assetDetails}.zip`,
        });
    } else {
        await context.tracing.stop();
    }
};

function createAssetDirectoryIfNotExists(testInfo: TestInfo, directoryName: string): string {
    const dir = `${testInfo.outputDir}/${directoryName}`;
    fs.mkdirSync(dir, { recursive: true });

    return dir;
}