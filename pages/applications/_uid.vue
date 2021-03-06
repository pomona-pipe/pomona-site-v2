<template>
  <div>
    <!-- Hero Section  -->
    <section class="hero" :style="heroStyles">
      <!-- breadcrumbs nav -->
     <Breadcrumb :breadcrumbs="breadcrumbs"/>
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text :field="document.data.name" />
            </div>
            <div>
              <p class="subtitle">{{ document.data.description }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <SlicesBlock :slices="document.data.body" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { Route } from 'vue-router/types'
import { find } from 'lodash'
import { IPrismic, IPrismicDocument } from '~/shims'
import SlicesBlock from '~/components/PageComponents/ProductDetail/SlicesBlock.vue'
import Breadcrumb from '~/components/Navigation/Breadcrumbs.vue'

@Component({
  components: {
    SlicesBlock,
    Breadcrumb,
  },
  computed: {
    ...mapState('layout', ['placeholders']),
    ...mapState('applications', ['applications']),
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
export default class Index extends Vue {
  document: IPrismicDocument | null = null
  breadcrumbs: IBreadcrumb[] | null = null

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

    // if application exists in store, return
    const storeApplication = find(store.state.applications.applications, {
      uid
    })
    if (storeApplication) return

    // else, query application and add to store
    const result = await $prismic.api.getByUID('applications', uid)
    store.commit('applications/addApplication', result)
  }

  created() {
    const uid = this.$route.params.uid
    this.document = find(this.$store.state.applications.applications, { uid })
    this.breadcrumbs = [
      {
        exact: true,
        text: 'Applications',
        to: {
          path: '/applications'
        }
      },
      {
        exact: true,
        text: this.document!.data.name[0].text,
        to: {
          path: `/applications/${this.document!.uid}`
        }
      }
    ]
  }
}
</script>
