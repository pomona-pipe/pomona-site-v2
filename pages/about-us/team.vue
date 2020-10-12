<template>
  <div id="team-page" class="page">
    <!-- Hero -->
    <section class="hero" :style="heroStyles">
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text :field="team[0].data.main_title" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- Page Content -->
    <section>
      <v-container>
        <v-row>
          <v-col v-for="employee in employees" :key="employee.id" cols="12" sm="6" lg="3">
            <v-card hover outlined height="100%">
              <v-img :src="employee.data.profile_image.url || placeholders.account" height="200px"></v-img>

              <v-card-title>{{ employee.data.name }}</v-card-title>
              <v-card-text>
                {{ employee.data.job_title }}
                <br />
                {{ employee.data.territory }}
                <a :href="`mailto:${employee.data.email_address}`">
                  {{
                  employee.data.email_address
                  }}
                </a>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { mapState } from 'vuex'
import pageVisits from '~/services/pageVisits'

@Component({
  components: {},
  computed: {
    ...mapState('layout', ['placeholders']),
    ...mapState('pages', ['team']),
    ...mapState('employees', ['employees']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          this.$store.state.pages.team[0].data.main_image.url
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class Index extends Vue {
  async fetch({ store, $prismic }: Context) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getTeam', $prismic)
    await store.dispatch('employees/getEmployees', $prismic)
  }
}
</script>
