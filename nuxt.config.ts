// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8"
        }
      ],
      title: 'IU - Color Blind Game'
    },
  },
  css: [
    '~/assets/app.sass'
  ],
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    'nuxt-icon'
  ],
  plugins: [
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' }
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL
    }
  },
  ssr: false,
})
