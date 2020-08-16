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

  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    const pageUid = store.state.layout.pageUid
    const storeProduct = find(store.state.products.products, ['uid', pageUid])
    // return if product exists in store
    if (storeProduct) return

    // else, query product and add to store
    const product = await $prismic.api.getByUID('products', pageUid)
    store.commit('products/addProducts', [product])
  }

  // fetch product from store and copy to component
  created() {
    const pageUid = this.$store.state.layout.pageUid
    this.document = find(this.$store.state.products.products, ['uid', pageUid])
  }
}
</script>
