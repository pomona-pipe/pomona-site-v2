<template>
  <div class="page">
    <ProjectDescription />
    <Overview />
    <Background />
    <OurSolution />
    <FullGallery />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { Route } from 'vue-router/types'
import { find } from 'lodash'
import { IPrismic, IPrismicDocument } from '~/shims'
import ProjectDescription from '~/components/PageComponents/ProjectDetailSections/ProjectDescription.vue'
import Overview from '~/components/PageComponents/ProjectDetailSections/Overview.vue'
import Background from '~/components/PageComponents/ProjectDetailSections/Background.vue'
import OurSolution from '~/components/PageComponents/ProjectDetailSections/OurSolution.vue'
import FullGallery from '~/components/PageComponents/ProjectDetailSections/FullGallery.vue'

@Component({
  components: {
    ProjectDescription,
    Overview,
    Background,
    OurSolution,
    FullGallery
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
