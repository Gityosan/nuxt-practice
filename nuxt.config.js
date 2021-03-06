import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt2-practice',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: './plugins/gmap-vue.js', mode: 'client' }],

  publicRuntimeConfig: {
    MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
    MICROCMS_API_URL: process.env.MICROCMS_API_URL,
    GOOGLE_MAPS_JS_API_KEY: process.env.GOOGLE_MAPS_JS_API_KEY,
    GOOGLE_FORM_URL: process.env.GOOGLE_FORM_URL
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],

  proxy: {
    '/googleform': {
      target: process.env.GOOGLE_FORM_URL,
      pathRewrite: { '^/googleform': '' }
    },
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: { '^/api': '' }
    }
  },
  axios: {
    proxy: true
  },

  serverMiddleware: ['~/server/nodemailer.js'],
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      light: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^gmap-vue($|\/)/]
  }
  // generate: {
  //   async routes() {
  //     const routes = []
  //     await axios
  //       .get(process.env.MICROCMS_API_URL + '/blog', {
  //         headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY }
  //       })
  //       .then((res) => {
  //         for (let i = 0, len = res.data.contents.length; i < len; i++) {
  //           const item = res.data.contents[i]
  //           routes.push({
  //             route: '/blog/' + item.id,
  //             payload: item
  //           })
  //         }
  //       })
  //       .catch((e) => {
  //         console.log('microCMS/listBlogs/Error', e)
  //       })
  //   }
  // }
}
