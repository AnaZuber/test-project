// in this file you can append custom step methods to 'I' object
import { injectAxe, checkA11y } from 'axe-playwright'

export = function() {
  return actor({
    checkA11y: function () {
      this.usePlaywrightTo('Run accessability tests', async ({ page}) => {
        await injectAxe(page)
        await checkA11y(page)
      })
    },
    acceptCookies: async function () {
      const isCookieVisible = await this.grabNumberOfVisibleElements('#hs-eu-cookie-confirmation');
      if (isCookieVisible > 0) {
        this.click('#hs-eu-confirmation-button');
      }
    },
  });
}
