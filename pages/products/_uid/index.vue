<template>
  <v-layout>
    <v-flex>
      <v-container>
        <!-- check product categories exists -->
        <div>
          <h1>{{ pageName }}</h1>
        </div>
        <v-layout v-if="products.length > 0" row wrap column justify-center align-center>
          <!-- template for product category cards -->
          <v-container fluid grid-list-sm>
            <v-layout row wrap class="align-stretch">
              <v-flex v-for="product in products" :key="product.data.id" xs12 md6 lg3>
                <v-hover v-slot:default="{ hover }" open-delay="200">
                  <v-card
                    :to="`./${pageUid}/${product.uid}`"
                    :elevation="hover ? 16 : 2"
                    class="mx-auto"
                    max-width="344"
                    height="100%"
                  >
                    <v-img :src="product.data.cover_image.url" height="200px"></v-img>

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
import { Store, mapState } from 'vuex'
import { find } from 'lodash'
import { IPrismic } from '~/shims'

@Component({
  computed: {
    ...mapState('layout', ['pageUid', 'pageName'])
  }
})
export default class ProductCategoryPage extends Vue {
  get products() {
    const category = this.$store.state.layout.pageName
    return this.$store.state.products.products.filter(
      (product: any) => product.data.product_category === category
    )
  }

  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    const category = store.state.layout.pageName
    const productsExist = find(
      store.state.products.products,
      (product) => product.data.product_category === category
    )
    if (productsExist) return
    await store.dispatch('products/getProductsByCategory', {
      $prismic,
      category
    })
  }
}
</script>
