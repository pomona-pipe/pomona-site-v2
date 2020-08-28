<template>
  <div class="page">
    <ProjectDescription />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { Route } from 'vue-router/types'
import { find } from 'lodash'
import { IPrismic, IPrismicDocument } from '~/shims'
import ProjectDescription from '~/components/PageComponents/ProjectDetailSections/ProjectDescription.vue'
@Component({
  components: {
    ProjectDescription
  },
  
})
export default class DetailPage extends Vue {

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

}
</script>
