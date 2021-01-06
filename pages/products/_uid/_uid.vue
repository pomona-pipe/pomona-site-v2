<template>
  <div>
    <!-- Hero Section  -->
    <section class="hero" :style="heroStyles">
      <v-breadcrumbs dark :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon small>{{ mdiChevronRight }}</v-icon>
        </template>
      </v-breadcrumbs>

      <v-container>
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text :field="document.data.name" />
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
import { Store, mapState } from 'vuex'
import { find } from 'lodash'
import { Route } from 'vue-router/types'
import { IPrismic, IPrismicDocument } from '~/shims'
import { mdiChevronRight } from '@mdi/js'
import parseNameFromUid from '~/services/uidToPageName'
import SlicesBlock from '~/components/PageComponents/ProductDetail/SlicesBlock.vue'

@Component({
  components: {
    SlicesBlock
  },
  computed: {
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).document.data.hero_image.fileUrl
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class DetailPage extends Vue {
  document: IPrismicDocument | null = null
  breadcrumbs: IBreadcrumb[] | null = null

  mdiChevronRight = mdiChevronRight
  parseNameFromUid = parseNameFromUid

  head() {
    return {
      title: (this as any).document.data.name[0].text
    }
  }

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

    const categoryBreadCrumbTitle = parseNameFromUid(
      this.document!.data.product_category.uid
    )

    this.breadcrumbs = [
      {
        exact: true,
        text: 'Products',
        to: {
          path: '/products'
        }
      },
      {
        exact: true,
        text: categoryBreadCrumbTitle,
        to: {
          path: `/products/${this.document!.data.product_category.uid}`
        }
      },
      {
        exact: true,
        text: this.document!.data.name[0].text,
        to: {
          path: `/products/${this.document!.data.product_category.uid}/${
            this.document!.uid
          }`
        }
      }
    ]
  }
}
</script>
