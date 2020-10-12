<template>
  <div>
    <!-- Hero Section  -->
    <section class="hero" :style="heroStyles">
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text :field="document.data.name" />
            </div>
            <div>
              <p class="subtitle">{{ document.data.description[0].text }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <SlicesBlock :slices="document.data.body" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { mapState } from 'vuex'
import { find } from 'lodash'
import { Route } from 'vue-router/types'
import { IPrismicDocument } from '~/shims'
import SlicesBlock from '~/components/PageComponents/ProductDetail/SlicesBlock.vue'

@Component({
  components: {
    SlicesBlock
  },
  computed: {
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).document.data.cover_image.url
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class DetailPage extends Vue {
  document: IPrismicDocument | null = null

  async fetch({ store, $prismic, params }: Context) {
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
