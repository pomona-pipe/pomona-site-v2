import Vuetify from 'vuetify'

declare module '@nuxt/types' {
  interface Context {
    $vuetify: typeof Vuetify
  }
}
