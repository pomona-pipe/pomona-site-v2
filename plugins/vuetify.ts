import Vue from 'vue'
import Vuetify from 'vuetify'
import { Context } from '@nuxt/types'
import theme from '~/settings/theme'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader version "^2.1.1" ,
Vue.use(Vuetify)

export default (ctx: Context) => {
  const vuetify = new Vuetify({
    theme
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = ctx.app.vuetify
}
