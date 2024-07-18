/// <reference types='codeceptjs' />
import fs from 'fs';
import { chromium } from 'playwright';
import assert from 'assert';

Feature('Network Testing with HAR');
Scenario('Capture and Compare HAR Files', async ({ I }) => {
    const capturedHarPath = './output/har/captured_requests.har';
    const expectedHarPath = './output/har/expected_requests.har';

    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordHar: {
            path: fs.existsSync(expectedHarPath) ? capturedHarPath : expectedHarPath,
        },
    });

    const page = await context.newPage();
    await page.goto('https://shftrs.com');
    await page.waitForLoadState('networkidle', {timeout: 5000});
    await context.close();
    await browser.close();

    const harContent = fs.readFileSync('./output/har/captured_requests.har', 'utf8');
    const har = JSON.parse(harContent);

    const expectedResourcesContent = fs.readFileSync('./output/har/expected_requests.har', 'utf8');
    const expectedResources = JSON.parse(expectedResourcesContent);

    const capturedRequests = har.log.entries.map(entry => ({
        url: entry.request.url,
        method: entry.request.method,
        headers: entry.request.headers,
        postData: entry.request.postData,
    }));

    expectedResources.log.entries.forEach(expectedEntry => {
        const requestFound = capturedRequests.some(req => req.url === expectedEntry.request.url);
        assert(requestFound, `Expected request ${expectedEntry.request.url} was captured`);
    });
});