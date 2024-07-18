import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
import { output } from 'codeceptjs';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './tests/*.test.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://shftrs.com',
      show: true
    },
    ResembleHelper: {
      require: 'codeceptjs-resemblehelper',
      screenshotFolder: './output/',
      baseFolder: './output/base',
      diffFolder: './output/diff'
    },
    A11yHelper: {
      require: 'codeceptjs-a11y-helper',
      outputDir: './output/reports',
      axeOptions: {
        runOnly: {
          values: [
            'wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag22aa',
            'best-practice', 'wcag***', 'ACT', 'experimental', 'cat.*'
          ],
        },
      },
    },
  },
  include: {
    I: './steps_file.ts'
  },
  name: 'test-project',
  plugins: {
    enabled: "@codeconceptjs/axe",
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: false
    }
  }
}