// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: false,
  ssr: false,
  css: ['~/assets/scss/main.scss'],
  modules: ['reka-ui/nuxt', 'nuxt-swiper'],
})