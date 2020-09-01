import { Configuration } from 'webpack'
import theme from './settings/theme'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
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
        href:
        'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'
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
        href:
          'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
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
  plugins: ['@plugins/prismic-links.client.ts'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@/modules/static',
    '@/modules/crawler',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/prismic'
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
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config: Configuration) {
      config.resolve!.alias!.vue = 'vue/dist/vue.common'
    },
    external: {
      dropbox: 'dropbox'
    }
  }
}
