<template>
  <section>
    <v-row cols="12">
      <v-col v-for="project in projects" :key="project.id" sm="6" lg="4">
        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-card
            :to="`/projects/${project.uid}`"
            :elevation="hover ? 16 : 0"
            height="100%"
            class="d-flex flex-column justify-space-between"
          >
            <v-img
              :src="
                project.data.project_description_hero.url || placeholders.file
              "
            ></v-img>

            <v-card-title>
              {{ project.data.project_name[0].text }}
            </v-card-title>
            <v-card-text class="text--primary">
              {{ project.data.project_description }}
            </v-card-text>
            <v-card-subtitle>
              {{ formatDateString(project.data.overview_completion_date) }} in
              {{ project.data.project_location }}
            </v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </section>
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
    ...mapState('projects', ['projects'])
  }
})
export default class Index extends Vue {
  formatDateString(dateString: string) {
    return moment(dateString).format('MMMM Do YYYY')
  }

  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('projects/getProjects', $prismic)
  }
}
</script>
