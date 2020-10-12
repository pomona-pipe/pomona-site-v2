import { Store } from 'vuex'
import IPrismic from './prismic'
import Vuetify from 'vuetify'

export { default as IPrismic } from './prismic'

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<any>
    $prismic: IPrismic
  }
}

declare module '@nuxt/types' {
  interface Context {
    $prismic: IPrismic
    $vuetify: typeof Vuetify
  }
}
