<template>
  <section>
    <v-row cols="12">
      <v-col sm="6">
        <v-img
          :src="document.data.cover_image.url || placeholders.file"
        ></v-img>
      </v-col>
      <v-col sm="6">
        <h1>{{ document.data.name[0].text }}</h1>
        <p>{{ document.data.description[0].text }}</p>
      </v-col>
    </v-row>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { find } from 'lodash'
import { IPrismic, IPrismicDocument } from '~/shims'
@Component({
  computed: {
    ...mapState('layout', ['placeholders'])
  }
})
export default class DetailPage extends Vue {
  document: IPrismicDocument | null = null

  async fetch({
    store,
    $prismic,
    error
  }: {
    store: Store<any>
    $prismic: IPrismic
    error: any
  }) {
    const pageUid = store.state.layout.pageUid
    const storeProduct = find(store.state.products.products, ['uid', pageUid])
    // check if product is already in store
    if (storeProduct) return
    // attempt to fetch product
    try {
      const result = await $prismic.api.getByUID('products', pageUid)
      store.commit('products/addProducts', [result])
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found', error: e })
    }
  }

  // retrieve correct document from store
  created() {
    const pageUid = this.$store.state.layout.pageUid
    this.document = find(this.$store.state.products.products, ['uid', pageUid])
  }
}
</script>
