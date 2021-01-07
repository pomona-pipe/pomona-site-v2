import { Configuration } from 'webpack'
import theme from './settings/theme'

export default {
  mode: 'universal',
  /*
   ** Server-Side environment vars to pass to client
   ** can access in UI thru either
   ** 1. process.env.myEnvVarCamelCase
   ** 2. context.env.myEnvVarCamelCase
   */
  env: {
    algoliaAppId: process.env.ALGOLIA_APP_ID,
    algoliaApiKey: process.env.ALGOLIA_API_KEY
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '',
    titleTemplate: (titleChunk: string) => {
      return titleChunk
        ? `${titleChunk} - Pomona Pipe Products`
        : 'Pomona Pipe Products'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@plugins/prismic-links.client.ts',
    '@plugins/vue-instantsearch.ts'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/http',
    '@/modules/static',
    '@/modules/crawler',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/prismic',
    '@nuxtjs/sitemap'
  ],
  // vuetify config
  vuetify: {
    theme,
    icons: {
      iconfont: 'mdiSvg'
    },
    defaultAssets: false,
    treeShake: true,
    customVariables: ['~/assets/style/vuetify.scss']
  },
  // This is where you configure your settings for the new plugin
  prismic: {
    endpoint: 'https://pomona.cdn.prismic.io/api/v2',
    linkResolver: '@/plugins/link-resolver.ts',
    htmlSerializer: '@/plugins/html-serializer.ts'
  },
  // @nuxtjs/sitemap module config
  sitemap: {
    hostname: 'https://www.pomonapipeproducts.com',
    gzip: true,
    exclude: ['/preview'],
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** style-resources for sharing scss vars across files
   ** https://github.com/nuxt-community/vuetify-module
   */
  styleResources: {
    scss: ['~/assets/style/variables.scss']
  },
  /*
   **  server middleware - use for api endpoints
   **  https://nuxtjs.org/api/configuration-servermiddleware/
   */
  serverMiddleware: { '/api': '~/api' },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
    /*
     ** You can extend webpack config here
     */
    extend(config: Configuration) {
      config.resolve!.alias!.vue = 'vue/dist/vue.common'
    }
  }
}
