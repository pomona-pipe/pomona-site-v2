<template>
  <div id="technical-guides-page" class="page">
    <!-- Hero -->
    <section class="hero" :style="heroStyles">
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text :field="technicalGuidesPage[0].data.main_title" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- Page Content -->
    <section>
      <v-container>
        <!-- template for downloadable documents -->
        <v-row>
          <v-col v-for="file in technicalGuidesPage[0].data.all_documents" :key="file.id" cols="12" sm="4" md="3" lg="2">
            <v-card target="_blank" :href="`${file.document.fileUrl}`" hover outlined height="100%">
              <v-img :src="file.document.thumbnail || placeholders.file" height="200px"></v-img>

              <v-card-title>{{ file.document.fileName }}</v-card-title>
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
import ContactForm from '~/components/Forms/ContactForm.vue'

@Component({
  computed: {
    ...mapState('pages', ['technicalGuidesPage']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).$store.state.pages.technicalGuidesPage[0].data.hero_image.fileUrl
        }@459h")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class Index extends Vue {
  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getTechnicalGuidesPage', $prismic)
  }
}
</script>
