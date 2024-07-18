/// <reference types='codeceptjs' />

Feature('Accessibility Testing');
Scenario('Check Accessibility of the Website', async ({ I }) => {
    I.amOnPage('/');
    I.waitForFunction(() => document.readyState === 'complete');

    await I.acceptCookies();

    // I.checkA11y();

    // Check accessibility and generate report 
    I.runA11yCheck();

    
});