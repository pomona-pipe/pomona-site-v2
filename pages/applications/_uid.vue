<template>
  <div>
    <!-- Hero Section  -->
    <section class="hero" :style="heroStyles">
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
import { Context } from '@nuxt/types'
import { mapState } from 'vuex'
import { Route } from 'vue-router/types'
import pageVisits from '~/services/pageVisits'
import { find } from 'lodash'
import { Document } from 'prismic-javascript/src/documents'
import SlicesBlock from '~/components/PageComponents/ProductDetail/SlicesBlock.vue'

@Component({
  components: {
    SlicesBlock
  },
  computed: {
    ...mapState('layout', ['placeholders']),
    ...mapState('applications', ['applications']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).document.data.hero_image.url
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class Index extends Vue {
  document: Document | null = null

  async fetch({ store, $prismic, params }: Context) {
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
  }
}
</script>
