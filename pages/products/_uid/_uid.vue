<template>
  <SlicesBlock :slices="document.data.body" />
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { find } from 'lodash'
import { Route } from 'vue-router/types'
import { IPrismic, IPrismicDocument } from '~/shims'
import SlicesBlock from '~/components/PageComponents/ProductDetail/SlicesBlock.vue'

@Component({
  components: {
    SlicesBlock
  }
})
export default class DetailPage extends Vue {
  document: IPrismicDocument | null = null

  async fetch({
    store,
    $prismic,
    params
  }: {
    store: Store<any>
    $prismic: IPrismic
    params: Route['params']
  }) {
    const { uid } = params

    // return if product exists in store
    const storeProduct = find(store.state.products.products, { uid })
    if (storeProduct) return

    // else, query product and add to store
    const product = await $prismic.api.getByUID('products', uid)
    store.commit('products/addProducts', [product])
  }

  // fetch product from store and copy to component
  created() {
    const uid = this.$route.params.uid
    this.document = find(this.$store.state.products.products, { uid })
  }
}
</script>
