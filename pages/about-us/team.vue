<template>
  <div id="team-page" class="page">
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
    <v-container>
      <!-- Page Content -->
      <v-row>
        <v-col
          v-for="employee in employees"
          :key="employee.id"
          cols="12"
          sm="6"
          lg="3"
        >
          <v-card hover outlined height="100%">
            <v-img
              :src="employee.data.profile_image.url || placeholders.account"
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
        </v-col>
      </v-row>
    </v-container>
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
    ...mapState('pages', ['team']),
    ...mapState('employees', ['employees'])
  }
})
export default class Index extends Vue {
  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getTeam', $prismic)
    await store.dispatch('employees/getEmployees', $prismic)
  }
}
</script>
