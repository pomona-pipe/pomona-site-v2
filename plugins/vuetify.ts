import Vue from 'vue'
import Vuetify from 'vuetify'
import { Context } from '@nuxt/types'
import theme from '~/settings/theme'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify)

export default (ctx: Context) => {
  const vuetify = new Vuetify({
    theme,
    /*
     ** TODO: update to svg mdi icons
     ** https://vuetifyjs.com/en/customization/icons/
     */
    icons: {
      iconfont: 'mdi'
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = ctx.app.vuetify
}
