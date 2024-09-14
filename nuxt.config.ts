// todo: адаптувати activityDetails та addActivity
// зробити можливість додавання активностей до улюблених

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
 build: {
  transpile: ['@vuepic/vue-datepicker', 'vuetify']
},

 // default settings for SEO
app: {
  head: {
    charset: 'utf-8',
    viewport: 'width=device-width, initial-scale=1',
    // підключення bootstrap через CDN
    link: [
        // google fonts connection
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap'
      },
        // bootstrap connection
      {
        rel: 'stylesheet',
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      },
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
        tagPosition: 'bodyClose'
      },
    ]
  }
},

 css: ['@/assets/css/base.css', "@/assets/css/main.css"],
 devtools: { enabled: true },

 modules: [
  //  Vuetify
  (_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      // @ts-expect-error
      config.plugins.push(vuetify({ autoImport: true }))
    })
  },
  // leaflet maps connection
  'nuxt3-leaflet',
    // pinia
  '@pinia/nuxt',
    // vee-validate
  '@vee-validate/nuxt',
],

 pinia: {
  storesDirs: ['./stores/**'],
},

 vite: {
  vue: {
    template: {
      transformAssetUrls,
    },
  },
},

 ssr: true,
 compatibilityDate: '2024-08-09',
})