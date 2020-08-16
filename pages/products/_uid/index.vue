<template>
  <v-layout>
    <v-flex>
      <v-container>
        <!-- check product categories exists -->
        <v-layout
          v-if="products.length > 0"
          row
          wrap
          column
          justify-center
          align-center
        >
          <!-- template for product category cards -->
          <v-container fluid grid-list-sm>
            <v-layout row wrap class="align-stretch">
              <v-flex
                v-for="product in products"
                :key="product.data.id"
                xs12
                md6
                lg3
              >
                <v-hover v-slot:default="{ hover }" open-delay="200">
                  <v-card
                    :to="`./${pageUid}/${product.uid}`"
                    :elevation="hover ? 16 : 2"
                    class="mx-auto"
                    max-width="344"
                    height="100%"
                  >
                    <v-img
                      :src="product.data.cover_image.url || placeholders.file"
                      height="200px"
                    ></v-img>

                    <v-card-title>{{ product.data.name[0].text }}</v-card-title>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
          </v-container>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Route } from 'vue-router/types'
import { Store, mapState } from 'vuex'
import { find } from 'lodash'
import pageVisits from '~/services/pageVisits'
import { IPrismic } from '~/shims'

@Component({
  computed: {
    ...mapState('layout', ['pageUid', 'placeholders'])
  }
})
export default class ProductCategoryPage extends Vue {
  get products() {
    const pageUid = this.$store.state.layout.pageUid
    return this.$store.state.products.products.filter(
      (product: any) => product.data.product_category.uid === pageUid
    )
  }

  async fetch({
    route,
    store,
    $prismic
  }: {
    route: Route
    store: Store<any>
    $prismic: IPrismic
  }) {
    // return if page has been visited
    if (pageVisits() > 1) return
    // get product category if needed
    const { uid } = route.params
    let cat = find(
      store.state.products.productCategories,
      (category) => category.uid === uid
    )
    if (!cat) {
      const pageUid = store.state.layout.pageUid
      cat = await $prismic.api.getByUID('product_categories', pageUid)
      store.commit('products/addProductCategory', cat)
    }
    // get products by category id
    const catId = cat.id
    await store.dispatch('products/getProductsByCategory', {
      $prismic,
      catId
    })
  }
}
</script>
