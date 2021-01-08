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
                :src="cat.data.hero_image.fileUrl || placeholders.file"
                height="200px"
              ></v-img>

              <v-card-title>{{ cat.data.name[0].text }}</v-card-title>
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
import { IPrismic } from '~/shims'

@Component({
  components: {},
  computed: {
    ...mapState('layout', ['placeholders']),
    ...mapState('products', ['productCategories']),
    ...mapState('pages', ['categoryPage']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).$store.state.pages.categoryPage[0].data.hero_image
            .fileUrl
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class Index extends Vue {
  head() {
    return {
      title: (this as any).categoryPage[0].data.title_tag,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: (this as any).categoryPage[0].data.meta_description
        }
      ]
    }
  }

  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('products/getProductCategories', $prismic)
    await store.dispatch('pages/getCategoryPage', $prismic)
  }
}
</script>
