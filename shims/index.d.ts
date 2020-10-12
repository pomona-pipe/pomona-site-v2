import { Store } from 'vuex'
import IPrismic from './prismic'

export { default as IPrismic } from './prismic'
export { IPrismicDocument } from './prismic'

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<any>
    $prismic: IPrismic
  }
}

declare module '@nuxt/types' {
  interface Context {
    $prismic: IPrismic
  }
}
