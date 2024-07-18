/// <reference types='codeceptjs' />
import fs from 'fs';

Feature('Visual testing');
Scenario('Test page appearance by section', async ({ I }) => {
    I.amOnPage('/');
    I.waitForFunction(() => document.readyState === 'complete');

    await I.acceptCookies();

    const elements = [
        { selector: '.kl-header', name: 'header.png' },
        { selector: '.kl-footer', name: 'footer.png' },
        { selector: '.row-fluid-wrapper.row-depth-1.row-number-2', name: 'transformation.png' },
        { selector: '.row-fluid-wrapper.row-depth-1.row-number-3', name: 'features.png' },
        { selector: '.row-fluid-wrapper.row-depth-1.row-number-6', name: 'testimonials.png' },
        { selector: '.row-fluid-wrapper.row-depth-1.row-number-9', name: 'licensing.png' },
        { selector: '.row-fluid-wrapper.row-depth-1.row-number-12', name: 'faq.png' }
    ];

    elements.forEach(element => {
        I.saveElementScreenshot(element.selector, element.name);
    });

    // Perform visual diff comparisons
    elements.forEach(element => {
        I.seeVisualDiffForElement(element.selector, element.name, { tolerance: 2, prepareBaseImage: !fs.existsSync("./output/base") ? true : false });
    });
});

Scenario('Test page appearance', async ({ I }) => {
    I.amOnPage('/');
    I.waitForFunction(() => document.readyState === 'complete');

    await I.acceptCookies();

    I.saveElementScreenshot('.body-wrapper', 'landingPage.png');
    I.seeVisualDiffForElement('.body-wrapper', 'landingPage.png', { tolerance: 2, prepareBaseImage: !fs.existsSync("./output/base/landingPage.png") ? true : false });

});

Scenario('Test faq section appearance', async ({ I }) => {
    I.amOnPage('/');
    I.waitForFunction(() => document.readyState === 'complete');

    await I.acceptCookies();

    const faqEntriesCount = await I.grabNumberOfVisibleElements('.kl-faq__entry');

    for (let i = 1; i <= faqEntriesCount; i++) {        
        I.click(`.kl-faq__entry:nth-child(${i}) .kl-faq__header h3`);
        I.waitForVisible(`.kl-faq__entry:nth-child(${i}) .kl-faq__description[style*="height"]`, 5);

        I.saveElementScreenshot(`.kl-faq__entry:nth-child(${i}) .kl-faq__description`, `faq_${i}.png`);
        I.seeVisualDiffForElement(`.kl-faq__entry:nth-child(${i}) .kl-faq__description`, `faq_${i}.png`, { tolerance: 2, prepareBaseImage: !fs.existsSync('./output/base/faq_*.png') ? true : false });

    }
});
