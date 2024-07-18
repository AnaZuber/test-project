/// <reference types='codeceptjs' />
import fs from 'fs';
import assert from 'assert';

Feature('Resource Validation');
Scenario('Validate CSS/JS resources loaded', async ({ I }) => {
    I.amOnPage('/');
    const loadedResources = await I.executeScript(() => {
        const elements = Array.from(document.querySelectorAll('link[rel="stylesheet"], script[src]'));
        return elements.map(element => {
            if ((element as HTMLLinkElement).href) {
                return (element as HTMLLinkElement).href;
            }
            if ((element as HTMLScriptElement).src) {
                return (element as HTMLScriptElement).src;
            }
            return '';
        }).filter(src => src !== '') as string[];
    });

    const expectedResourcesPath = './output/resources/expected_resources.json';
    if (!fs.existsSync(expectedResourcesPath)) {
        fs.writeFileSync(expectedResourcesPath, JSON.stringify(loadedResources, null, 2), 'utf8');
        console.log(`Initial expected resources file created at: ${expectedResourcesPath}`);
    }

    const expectedResources = JSON.parse(fs.readFileSync(expectedResourcesPath, 'utf8')) as string[];

    loadedResources.sort();
    expectedResources.sort();
    assert.deepStrictEqual(loadedResources, expectedResources, 'Resources loaded do not match expected resources');
});