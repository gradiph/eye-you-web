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
    },
  },
  css: [
    '~/assets/app.sass'
  ],
  devtools: { enabled: true },
  modules: ['nuxt-icon'],
  plugins: [
    { src: '~/plugins/bootstrap.js', mode: 'client' }
  ],
})
