import { Store } from 'vuex'
import Vuetify from 'vuetify'
import Prismic from './prismic'

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<any>
    $prismic: Prismic
  }
}

declare module '@nuxt/types' {
  interface Context {
    $prismic: Prismic
    $vuetify: typeof Vuetify
  }
}
