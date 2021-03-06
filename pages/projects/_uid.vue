<template>
  <div class="page">
    <ProjectDescription />
    <Overview />
    <Background />
    <OurSolution />
    <FullGallery />
  </div>
</template>

<style lang="scss">
.img-float-md {
  width: 55%;
  &.float-md-left {
    margin: 0 16px 16px 0;
  }
  &.float-md-right {
    margin: 0 0 16px 16px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store } from 'vuex'
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
  }
})
export default class DetailPage extends Vue {
  document: IPrismicDocument | null = null

  head() {
    return {
      title: (this as any).document.data.title_tag,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: (this as any).document.data.meta_description
        }
      ]
    }
  }

  // fetch project from store and copy to component
  created() {
    const uid = this.$route.params.uid
    this.document = find(this.$store.state.projects.projects, { uid })
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
}
</script>
