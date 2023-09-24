// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  serverHandlers: [
    { route: '/backend/**', handler: '~/backend/index.ts' }
  ],
  devtools: { enabled: true }
})
