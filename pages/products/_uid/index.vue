<template>
  <v-container>
    <!-- template for product category cards -->
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.data.id"
        cols="12"
        md="6"
        lg="3"
      >
        <v-card :to="`./${uid}/${product.uid}`" outlined hover height="100%">
          <v-img
            :src="product.data.cover_image.url || placeholders.file"
            height="200px"
          ></v-img>

          <v-card-title>{{ product.data.name[0].text }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    ...mapState('layout', ['placeholders'])
  }
})
export default class ProductCategoryPage extends Vue {
  // product cards
  get products() {
    return this.$store.state.products.products.filter(
      (product: any) =>
        product.data.product_category.uid === this.$route.params.uid
    )
  }

  // for product card links
  get uid() {
    return this.$route.params.uid
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
    // return if page has been visited
    if (pageVisits() > 1) return

    const { uid } = params

    // get product category - either from store or by querying prismic
    let cat = find(
      store.state.products.productCategories,
      (category) => category.uid === uid
    )
    if (!cat) {
      cat = await $prismic.api.getByUID('product_categories', uid)
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
