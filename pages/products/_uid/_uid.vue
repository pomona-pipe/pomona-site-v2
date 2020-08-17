<template>
  <section>
    <v-row
      v-for="(section, index) in document.data.body"
      :key="`section-${index}`"
    >
      <v-col cols="12" md="6" :order-md="index % 2 === 0 ? 2 : 1">
        <h1>{{ section.primary.section_title[0].text }}</h1>
        <p>{{ section.primary.section_text[0].text }}</p>
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
      store.commit('products/addProduct', result)
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
