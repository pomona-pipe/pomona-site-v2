<template>
  <section class="hero" :style="heroStyles">
    <!-- breadcrumbs nav -->
    <v-breadcrumbs dark :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon small>{{ mdiChevronRight }}</v-icon>
      </template>
    </v-breadcrumbs>

    <v-container>
      <v-row align="center" class="fill-height">
        <v-col align="center">
          <div class="grey--text text--lighten-2">
            <prismic-rich-text :field="document.data.name" />
          </div>
          <div>
            <p class="subtitle">{{ document.data.project_description }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { Route } from 'vue-router/types'
import { find } from 'lodash'
import moment from 'moment'
import { IPrismic, IPrismicDocument } from '~/shims'
import { mdiChevronRight } from '@mdi/js'
@Component({
  computed: {
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).document.data.hero_image.fileUrl
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class ProjectDescription extends Vue {
  document: IPrismicDocument | null = null
  breadcrumbs: IBreadcrumb[] | null = null
  mdiChevronRight = mdiChevronRight

  formatDateString(dateString: string) {
    return moment(dateString).format('MMMM Do YYYY')
  }

  // fetch project from store and copy to component
  created() {
    const uid = this.$route.params.uid
    this.document = find(this.$store.state.projects.projects, { uid })
    this.breadcrumbs = [
      {
        exact: true,
        text: 'Projects',
        to: {
          path: '/projects'
        }
      },
      {
        exact: true,
        text: this.document!.data.name[0].text,
        to: {
          path: `/projects/${this.document!.uid}`
        }
      }
    ]
  }
}
</script>
