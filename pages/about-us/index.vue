<template>
  <div id="about-us-page" class="page">
    <!-- Hero Banner -->
    <section class="hero" :style="heroStyles">
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text :field="aboutUs[0].data.hero_title" />
            </div>
            <div>
              <p class="subtitle">
                {{ aboutUs[0].data.hero_subtitle[0].text }}
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
          <v-col sm="10" offset-sm="1">
            <prismic-rich-text
              class="text-center"
              :field="aboutUs[0].data.page_sections[0].primary.section_title"
            />
            <prismic-rich-text
              class="body"
              :field="aboutUs[0].data.page_sections[0].primary.section_text"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<style lang="css" scoped>
.body {
  width: 70%;
  margin: auto;
  padding: 10px;
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
    ...mapState('pages', ['aboutUs']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).$store.state.pages.aboutUs[0].data.hero_background_image
            .fileUrl
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
      title: (this as any).aboutUs[0].data.hero_title[0].text
    }
  }
  
  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getAboutUs', $prismic)
  }
}
</script>
