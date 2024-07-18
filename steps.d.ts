/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type ResembleHelper = import('codeceptjs-resemblehelper');
type A11yHelper = import('codeceptjs-a11y-helper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Playwright, ResembleHelper, A11yHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
