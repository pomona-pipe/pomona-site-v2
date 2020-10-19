<template>
  <div id="services-page" class="page">
    <!-- Hero Banner -->
    <section class="hero" :style="heroStyles">
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text :field="services[0].data.hero_title" />
            </div>
            <div>
              <p class="subtitle">
                {{ services[0].data.hero_subtitle[0].text }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- Page Content -->
    <section>
      <v-container>
        <v-row cols="12">
          <v-col sm="10" offset-sm="1" class="text-center">
            <prismic-rich-text
              :field="services[0].data.body[0].primary.section_title"
            />
            <prismic-rich-text
              :field="services[0].data.body[0].primary.section_text"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <v-container>
        <v-row>
          <v-col cols="12" md="12" class="text-center">
            <prismic-rich-text :field="services[0].data.body[1].primary.video_title" />
            <prismic-rich-text :field="services[0].data.body[1].primary.video_text" />
          </v-col>
          <v-col cols="12" md="12">
            <v-responsive
              style="max-height: 70vh; max-width: 124.5vh"
              class="mx-auto"
              :aspect-ratio="16 / 9"
            >
              <iframe
                width="100%"
                height="100%"
                :src="
                  services[0].data.body[1].primary.video_link.embed_url.replace(
                    'watch?v=',
                    'embed/'
                  )
                "
                allowfullscreen="true"
              ></iframe>
            </v-responsive>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<style lang="css" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import pageVisits from '~/services/pageVisits'
import { IPrismic } from '~/shims'

@Component({
  components: {},
  computed: {
    ...mapState('pages', ['services']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).$store.state.pages.services[0].data.hero_image.fileUrl
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class Index extends Vue {
  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getServices', $prismic)
  }
}
</script>
