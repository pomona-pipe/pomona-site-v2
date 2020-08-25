<template>
  <span>
    <v-row cols="12">
      <!-- Hero Banner Section -->
      <v-col sm="12" class="px-0 py-0">
        <v-img
          :src="home[0].data.hero_image.url"
          gradient="to top right, rgba(36, 36, 36, 0.9), rgba(25,32,72,.7)"
          max-height="250px"
          class="white--text"
        >
          <v-row align="center" class="fill-height">
            <v-col align="center">
              <div class="grey--text text--lighten-2">
                <prismic-rich-text :field="home[0].data.hero_title" />
              </div>
              <prismic-rich-text :field="home[0].data.hero_subtitle" />
            </v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>
    <!-- Value Prop Section -->
    <v-row cols="12">
      <!-- Value Prop Section title -->
      <v-col sm="12" class="text-center">
        <prismic-rich-text :field="home[0].data.value_prop_title" />
        <prismic-rich-text :field="home[0].data.value_prop_subtitle" />
        
      </v-col>
      <!-- prop 1 -->
      <v-col class="text-center">
        <v-icon size="75" color="blue darken-2">{{ mdiDraw }}</v-icon>
        <prismic-rich-text :field="home[0].data.prop_1_title" />
        <prismic-rich-text :field="home[0].data.prop_1_subtitle" />
      </v-col>
      <!-- prop 2 -->
      <v-col class="text-center">
        <v-icon size="75" color="purple darken-3" >{{ mdiTools }}</v-icon>
        <prismic-rich-text :field="home[0].data.prop_2_title" />
        <prismic-rich-text :field="home[0].data.prop_2_subtitle" />
      </v-col>
      <!-- prop 3 -->
      <v-col class="text-center">
        <v-icon size="75" color="green darken-2">{{ mdiExcavator }}</v-icon>
        <prismic-rich-text :field="home[0].data.prop_3_title" />
        <prismic-rich-text :field="home[0].data.prop_3_subtitle" />
      </v-col>
    </v-row>
    <hr />
    <!-- Customer Reach Section -->
    <v-row>
      <v-col>
        <v-img :src="home[0].data.customer_reach_map.url" max-height="800px" ></v-img>
      </v-col>
      <v-col>
        <prismic-rich-text :field="home[0].data.customer_reach_title" class="text-center" />
        <prismic-rich-text :field="home[0].data.customer_reach_subtitle" />
      </v-col>
    </v-row>
    <hr />
    <!-- Customer Logos Section -->
    <v-row>
      <v-col cols="12" class="text-center">
        <prismic-rich-text :field="home[0].data.customer_logo_title" />
      </v-col>
      <v-col v-for="logo in home[0].data.customer_logos" :key="logo.id">
        <v-img :src="logo.image.url" max-height="150px" max-width="100px"></v-img>
      </v-col>
    </v-row>
    <hr />
    <!-- Featured Project Section -->
    <!-- note this section is not on Prismic home page -->
    <v-row>
      <v-col cols="12" class="text-center">
        <h2>Featured Projects:</h2>
      </v-col>
      <v-col v-for="(project, index) in projects" :key="project.id" sm="6" lg="4">
        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-card
            v-if="index < 3"
            :to="`/projects/${project.uid}`"
            :elevation="hover ? 16 : 0"
            height="100%"
            class="d-flex flex-column justify-space-between"
          >
            <v-img
              :src="
                project.data.project_image.listing_page.url || placeholders.file
              "
            ></v-img>

            <v-card-title>
              {{ project.data.project_name[0].text }}
            </v-card-title>
            <v-card-text class="text--primary">
              {{ project.data.project_description[0].text }}
            </v-card-text>
            <v-card-subtitle>
              {{ formatDateString(project.data.completion_date) }} in
              {{ project.data.project_location[0].text }}
            </v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn to="/projects" large color="accent">See All Projects</v-btn>
      </v-col>
    </v-row>
  </span>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { mdiTools, mdiDraw, mdiExcavator } from '@mdi/js'
import moment from 'moment'
import pageVisits from '~/services/pageVisits'
import { IPrismic } from '~/shims'

@Component({
  components: {},
  computed: {
    ...mapState('pages', ['home']),
    ...mapState('layout', ['placeholders']),
    ...mapState('projects', ['projects'])
  }
})
export default class Index extends Vue {
  mdiTools = mdiTools
  mdiDraw = mdiDraw
  mdiExcavator = mdiExcavator

  formatDateString(dateString: string) {
    return moment(dateString).format('MMMM Do YYYY')
  }

  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getHome', $prismic)
    await store.dispatch('projects/getProjects', $prismic)
  }
}
</script>
