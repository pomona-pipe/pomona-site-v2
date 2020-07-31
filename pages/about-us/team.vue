<template>
  <div id="team-page" class="page">
    <!-- Hero Banner -->
    <v-row>
      <v-col sm="12" class="px-0 py-0">
        <v-img
          :src="team[0].data.main_image.url"
          gradient="to top right, rgba(36, 36, 36, 0.9), rgba(25,32,72,.7)"
          max-height="250px"
          class="white--text"
        >
          <v-row align="center" class="fill-height">
            <v-col align="center">
              <div class="grey--text text--lighten-2">
                <prismic-rich-text :field="team[0].data.main_title" />
              </div>
            </v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>
    <!-- Page Content -->
    <v-row>
      <v-col v-for="employee in employees" :key="employee.id" md="6" lg="3">
        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-card
            :elevation="hover ? 16 : 2"
            class="mx-auto"
            max-width="344"
            height="100%"
          >
            <v-img
              :src="employee.data.profile_image.url"
              height="200px"
            ></v-img>

            <v-card-title>{{ employee.data.name }}</v-card-title>
            <v-card-text>
              {{ employee.data.job_title }}
              <br />
              {{ employee.data.territory }}
              <a :href="`mailto:${employee.data.email_address}`">{{
                employee.data.email_address
              }}</a>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { IPrismic } from '~/shims'

@Component({
  components: {},
  computed: {
    ...mapState('pages', ['team']),
    ...mapState('employees', ['employees'])
  }
})
export default class Index extends Vue {
  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    await store.dispatch('pages/getTeam', $prismic)
    await store.dispatch('employees/getEmployees', $prismic)
  }
}
</script>
