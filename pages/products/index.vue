<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm6 md4 lg3 xl3>
      <v-container>
        <h1>All Product Categories</h1>
        <!-- check product categories exists -->
        <v-layout
          v-if="productCategories.length > 0"
          row
          wrap
          column
          justify-center
          align-center
        >
          <!-- template for product category cards -->
          <v-container fluid grid-list-lg>
            <v-layout row wrap class="align-stretch">
              <v-flex
                v-for="cat in productCategories"
                :key="cat.id"
                xs12
                sm6
                md4
                lg3
                xl3
              >
                <v-hover v-slot:default="{ hover }" open-delay="200">
                  <v-card
                    :to="`/products/${cat.uid}`"
                    :elevation="hover ? 16 : 2"
                    class="mx-auto"
                    max-width="344"
                    height="100%"
                  >
                    <v-img
                      :src="cat.data.category_image.url || placeholders.file"
                      height="200px"
                    ></v-img>

                    <v-card-title>{{
                      cat.data.category_title[0].text
                    }}</v-card-title>
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
import pageVisits from '~/services/pageVisits'
import { IPrismic } from '~/shims'

@Component({
  components: {},
  computed: {
    ...mapState('layout', ['placeholders']),
    ...mapState('products', ['productCategories'])
  }
})
export default class Index extends Vue {
  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('products/getProductCategories', $prismic)
  }
}
</script>
