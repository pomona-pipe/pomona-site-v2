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
import { Route } from 'vue-router/types'
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
    params
  }: {
    store: Store<any>
    $prismic: IPrismic
    params: Route['params']
  }) {
    const { uid } = params
    const storeProduct = find(store.state.products.products, { uid })
    // return if product exists in store
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
