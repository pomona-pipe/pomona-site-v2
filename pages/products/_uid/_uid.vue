<template>
  <div v-if="document.data.body.length > 0" class="page product-detail-page">
    <section
      v-for="(section, index) in document.data.body"
      :key="`section-${index}`"
    >
      <v-row>
        <v-col cols="12" md="6" :order-md="index % 2 === 0 ? 2 : 1">
          <prismic-rich-text :field="section.primary.section_title" />
          <prismic-rich-text :field="section.primary.section_text" />
        </v-col>
        <v-col cols="12" md="6" :order-md="index % 2 === 0 ? 1 : 2">
          <v-img
            v-if="section.items.length === 1"
            height="500"
            :src="document.data.cover_image.url || placeholders.file"
          ></v-img>
          <v-carousel v-else-if="section.items.length > 1" show-arrows-on-hover>
            <v-carousel-item
              v-for="image in section.items"
              :key="image.id"
              :src="image.section_image.url"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </section>
  </div>
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
