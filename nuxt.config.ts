// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    '@vesp/nuxt-fontawesome',
    'nuxt-splide',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    '@nuxt/image',
    '@pinia/nuxt'
  ],
  ssr: true,
  i18n:{
    locales: [
      { code: 'uz', iso: 'uz-UZ', name: 'UZ', file: 'uz.json' },
      { code: 'en', iso: 'en-US', name: 'EN', file: 'en.json' },
      { code: 'ru', iso: 'ru-RU', name: 'RU', file: 'ru.json' },
    ],
    defaultLocale: 'uz',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    vueI18n: './i18n/i18n.config.ts'
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/all.css'],
  build: {},
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  fontawesome: {
    icons: {
      solid: ['cog', 'star',
        'chevron-right',
        'heart',
        'chevron-left',
        'chevron-down',
        'chevron-up',
        'link',
        'star-half-stroke',
        'x',
        'xmark',
        'phone',
        'magnifying-glass',
        'bars',
        'arrow-down-wide-short', 'cart-shopping', 'house',
        'right-to-bracket',
        'right-from-bracket',
        'clipboard-list',
          'desktop',
        'clipboard'],
      regular: ['star', 'heart', 'star-half-stroke', 'trash-can', 'circle-user', 'clipboard'],
      brands: ['twitter', 'facebook', 'instagram', 'github', 'telegram']
    }
  },
  splide: {
    theme: 'default'
  },
  gtag: {
    id: 'G-CP4SCRG0SN'
  }
})
