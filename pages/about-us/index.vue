<template>
  <v-row cols="12">
    <!-- Hero Banner -->
    <v-col sm="12" class="px-0 py-0">
      <v-img
        :src="aboutUs[0].data.hero_background_image.url"
        gradient="to top right, rgba(36, 36, 36, 0.9), rgba(25,32,72,.7)"
        max-height="250px"
        class="white--text"
      >
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text :field="aboutUs[0].data.hero_title" />
            </div>
            <prismic-rich-text :field="aboutUs[0].data.hero_subtitle" />
          </v-col>
        </v-row>
      </v-img>
    </v-col>
    <!-- Page Content -->
    <v-col sm="10" offset-sm="1" class="text-center">
      <prismic-rich-text
        :field="aboutUs[0].data.page_sections[0].primary.section_title"
      />
      <prismic-rich-text
        :field="aboutUs[0].data.page_sections[0].primary.section_text"
      />
    </v-col>
  </v-row>
</template>
<style lang="css" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { IPrismic } from '~/shims'

@Component({
  components: {},
  computed: {
    ...mapState('pages', ['aboutUs'])
  }
})
export default class Index extends Vue {
  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    await store.dispatch('pages/getAboutUs', $prismic)
  }
}
</script>
