# Test Automation Project
This project is a test automation suite designed to validate various aspects of the SHFTRS website. It includes resource validation, visual testing, network testing and accessibility testing.

## Run all tests:
```bash
  npm test
```

## Test Scenarios

### Visual  Testing
This test captures screenshots of key elements and compares them with baseline images to detect visual changes.
File: `tests/visual.test.ts`

### Resource Validation
This test ensures that all expected CSS and JS resources are loaded correctly.
File: `tests/validating_resources.test.ts`

### Network Testing with HAR
This test captures and compares HAR files to validate network requests made by the website.
File: `tests/verify_network_req.test.ts`

### Accessibility Testing
This test checks the website for accessibility issues using the axe-core library.
File: `tests/accessibility.test.ts`

## Helpers
### Accept Cookies
Helper function to accept cookies if the cookie consent dialog is visible.
### Check Accessibility
Helper function to run accessibility checks using axe-playwright.
File: `steps_file.ts`
```typescript
import { injectAxe, checkA11y } from 'axe-playwright';
export = function() {
  return actor({
    acceptCookies: async function () {
      if(await this.grabNumberOfVisibleElements('#hs-eu-cookie-confirmation') > 0) {
        this.click('#hs-eu-confirmation-button');
      }
    },
    checkA11y: async function () {
      this.usePlaywrightTo('Run accessibility tests', async ({ page }) => {
        await injectAxe(page);
        await checkA11y(page);
      });
    }
  });
}
```