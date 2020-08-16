<template>
  <section>
    <v-row cols="12">
      <v-col sm="6">
        <v-img
          :src="
            document.data.project_image.detail_page.url || placeholders.file
          "
        ></v-img>
      </v-col>
      <v-col sm="6">
        <h1 align="center">{{ document.data.project_name[0].text }}</h1>
        <h4>
          {{ formatDateString(document.data.completion_date) }} in
          {{ document.data.project_location[0].text }}
        </h4>
        <div v-for="element in document.data.project_summary" :key="element.id">
          <p>{{ element.text }}</p>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { Route } from 'vue-router/types'
import { find } from 'lodash'
import moment from 'moment'
import { IPrismic, IPrismicDocument } from '~/shims'
@Component({
  computed: {
    ...mapState('layout', ['placeholders'])
  }
})
export default class DetailPage extends Vue {
  document: IPrismicDocument | null = null

  formatDateString(dateString: string) {
    return moment(dateString).format('MMMM Do YYYY')
  }

  async fetch({
    store,
    $prismic,
    params
  }: {
    store: Store<any>
    $prismic: IPrismic
    params: Route['params']
  }) {
    const { uid } = params
    // if project exists in store, return
    const storeProject = find(store.state.projects.projects, { uid })
    if (storeProject) return

    // else, query project and add to store
    const result = await $prismic.api.getByUID('projects', uid)
    store.commit('projects/addProject', result)
  }

  // fetch project from store and copy to component
  created() {
    const uid = this.$route.params.uid
    this.document = find(this.$store.state.projects.projects, { uid })
  }
}
</script>
