import { Configuration } from 'webpack'

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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   ** vuetify css loaded before app styles to enable overwriting
   */
  css: ['vuetify/dist/vuetify.css', '~/assets/style/app.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@plugins/vuetify.ts', '@plugins/prismic-links.client.ts'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
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
    }
  }
}
