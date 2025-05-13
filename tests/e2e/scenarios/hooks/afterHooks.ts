import { uiTest} from '../../fixtures'

uiTest.afterEach(async ({page}, testInfo) => {
    if (testInfo.status !== "passed") {
        const screenshot = await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
        testInfo.attach(testInfo.title, {
            body: screenshot,
            contentType: 'image/png',
        });

        const videoPath = await page.video()?.path();
        if (videoPath) {
            testInfo.attach('Failure Video', { path: videoPath, contentType: 'video/webm' });
        }
    }
});