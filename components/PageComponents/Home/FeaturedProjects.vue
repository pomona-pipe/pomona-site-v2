<template>
  <!-- Featured Project Section -->
  <!-- note this section is not on Prismic home page -->
  <section>
    <v-container>
      <h2 class="text-center">Featured Projects:</h2>
      <v-row class="mt-12">
        <v-col
          v-for="(project, index) in projects"
          :key="project.id"
          cols="12"
          sm="6"
          lg="4"
        >
          <v-card
            v-if="index < 3"
            :to="`/projects/${project.uid}`"
            hover
            outlined
            height="100%"
            class="d-flex flex-column justify-space-between"
          >
            <v-img
              :src="
                project.data.project_image.listing_page.url || placeholders.file
              "
            ></v-img>

            <v-card-title>{{ project.data.project_name[0].text }}</v-card-title>
            <v-card-text class="text--primary">{{
              project.data.project_description[0].text
            }}</v-card-text>
            <v-card-subtitle>
              {{ formatDateString(project.data.completion_date) }} in
              {{ project.data.project_location[0].text }}
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-hover v-slot:default="{ hover }">
            <v-btn
              to="/projects"
              rounded
              large
              color="primary"
              :outlined="hover ? true : false"
              >See All Projects</v-btn
            >
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import moment from 'moment'

@Component({
  components: {},
  computed: {
    ...mapState('pages', ['home']),
    ...mapState('projects', ['projects']),
    ...mapState('layout', ['placeholders'])
  }
})
export default class FeaturedProjects extends Vue {
  formatDateString(dateString: string) {
    return moment(dateString).format('MMMM Do YYYY')
  }
}
</script>
