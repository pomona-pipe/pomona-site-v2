<template>
  <v-container>
    <h1>All Product Categories</h1>
    <!-- template for product category cards -->
    <v-row>
      <v-col
        v-for="cat in productCategories"
        :key="cat.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card :to="`/products/${cat.uid}`" hover outlined height="100%">
          <v-img
            :src="cat.data.category_image.url || placeholders.file"
            height="200px"
          ></v-img>

          <v-card-title>{{ cat.data.category_title[0].text }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
