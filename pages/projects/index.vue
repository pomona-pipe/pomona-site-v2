<template>
  <div>
    <!-- Hero -->
    <section class="hero" :style="heroStyles">
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text
                :field="projectListingPage[0].data.main_title"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <v-container>
        <v-row>
          <v-col
            v-for="project in projects"
            :key="project.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card
              :to="`/projects/${project.uid}`"
              hover
              outlined
              height="100%"
            >
              <v-img
                :src="project.data.hero_image.fileUrl || placeholders.file"
                height="200px"
              ></v-img>

              <v-card-title>{{ project.data.name[0].text }}</v-card-title>
              <v-card-text class="text--primary">{{
                project.data.project_description
              }}</v-card-text>
              <v-card-subtitle>
                {{ formatDateString(project.data.overview_completion_date) }} in
                {{ project.data.project_location }}
              </v-card-subtitle>
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
import moment from 'moment'
import pageVisits from '~/services/pageVisits'
import { IPrismic } from '~/shims'

@Component({
  components: {},
  computed: {
    ...mapState('layout', ['placeholders']),
    ...mapState('projects', ['projects']),
    ...mapState('pages', ['projectListingPage']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).$store.state.pages.projectListingPage[0].data.hero_image
            .fileUrl
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class Index extends Vue {
  formatDateString(dateString: string) {
    return moment(dateString).format('MMMM Do YYYY')
  }

  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('projects/getProjects', $prismic)
    await store.dispatch('pages/getProjectListingPage', $prismic)
  }
}
</script>
