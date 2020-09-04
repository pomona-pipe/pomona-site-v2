<template>
  <div>
    <!-- Hero -->
    <section class="hero" :style="heroStyles">
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text :field="categoryPage[0].data.main_title" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- Page Content -->
    <section>
      <v-container>
        <!-- template for product category cards -->
        <v-row>
          <v-col v-for="cat in productCategories" :key="cat.id" cols="12" sm="6" md="4" lg="3">
            <v-card :to="`/products/${cat.uid}`" hover outlined height="100%">
              <v-img :src="cat.data.category_image.url || placeholders.file" height="200px"></v-img>

              <v-card-title>{{ cat.data.category_title[0].text }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import pageVisits from '~/services/pageVisits'
import { find } from 'lodash'
import { IPrismic, IPrismicDocument } from '~/shims'


@Component({
  components: {},
  computed: {
    ...mapState('layout', ['placeholders']),
    ...mapState('products', ['productCategories']),
    ...mapState('pages', ['categoryPage']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).$store.state.pages.categoryPage[0].data.main_image.url
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class Index extends Vue {
  async fetch({ store, $prismic, params }: { store: Store<any>; $prismic: IPrismic; params: Route['params'] }) {
    if (pageVisits() > 1) return
    await store.dispatch('products/getProductCategories', $prismic)
    await store.dispatch('pages/getCategoryPage', $prismic)
  }
}
</script>
