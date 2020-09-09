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
    <SlicesBlock :slices="document.data.body"  />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import pageVisits from '~/services/pageVisits'
import { find } from 'lodash'
import { IPrismic, IPrismicDocument } from '~/shims'
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
          (this as any).document.data
            .hero_image.url
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class Index extends Vue {
  document: IPrismicDocument | null = null

  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('applications/getApplications', $prismic)
  }

  created() {
    const uid = this.$route.params.uid
    this.document = find(this.$store.state.applications.applications, { uid })
  }
}
</script>
