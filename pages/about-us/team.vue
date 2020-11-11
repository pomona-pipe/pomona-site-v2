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
          <v-col v-for="employee in employees" :key="employee.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="card" hover outlined height="100%" max-width="300px">
              <v-img :src="employee.data.profile_image ? employee.data.profile_image.fileUrl : placeholders.account" height="200px"></v-img>
              <v-card-title>{{ employee.data.name }}</v-card-title>
              <v-card-text>
                {{ employee.data.job_title }}
                <br />
                <span v-if="employee.data.territory">
                  {{ employee.data.territory }}
                  <br />
                </span>
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

<style lang="css" scoped>
.card {
  margin: auto;
}
</style>

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
    ...mapState('employees', ['employees']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).$store.state.pages.team[0].data.hero_image.fileUrl
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
      title: (this as any).team[0].data.main_title[0].text
    }
  }

  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getTeam', $prismic)
    await store.dispatch('employees/getEmployees', $prismic)
  }
}
</script>
