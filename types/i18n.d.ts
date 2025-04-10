import { TranslateResult } from 'vue-i18n';

declare module '#app' {
  interface NuxtApp {
    $t: (key: string, values?: Record<string, any>) => TranslateResult;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, values?: Record<string, any>) => TranslateResult;
  }
}
