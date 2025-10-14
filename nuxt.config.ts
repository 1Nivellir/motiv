// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: false,
  ssr: false,
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    }
  },
  alias: {
    '@': '../app',
    '~': '../'
  },
  css: ['@/assets/scss/main.scss'],
  modules: ['reka-ui/nuxt', 'nuxt-swiper', '@pinia/nuxt', 'vue-yandex-maps/nuxt'],
  yandexMaps: {
    apikey: 'd56b21d6-4144-4697-a320-e1c814a911b4',
  },
})