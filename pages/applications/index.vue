<template>
  <div>
    <!-- Hero -->
    <section class="hero" :style="heroStyles">
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text :field="applicationsPage[0].data.main_title" />
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
          <v-col v-for="app in applications" :key="app.id" cols="12" sm="6" md="4" lg="3">
            <v-card :to="`/applications/${app.uid}`" hover outlined height="100%">
              <v-img :src="app.data.hero_image.fileUrl || placeholders.file" height="200px"></v-img>

              <v-card-title>{{ app.data.name[0].text }}</v-card-title>
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
import { IPrismic, IPrismicDocument } from '~/shims'

@Component({
  components: {},
  computed: {
    ...mapState('layout', ['placeholders']),
    ...mapState('pages', ['applicationsPage']),
    ...mapState('applications', ['applications']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).$store.state.pages.applicationsPage[0].data.hero_image
            .fileUrl
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class Index extends Vue {
  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getApplicationsPage', $prismic)
    await store.dispatch('applications/getApplications', $prismic)
  }
}
</script>
