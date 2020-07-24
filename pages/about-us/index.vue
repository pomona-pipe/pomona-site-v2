<template>
  <v-row cols="12">
    <v-col sm="12">
      <h1 align="center">{{ aboutUs[0].data.main_title[0].text }}</h1>
    </v-col>
    <v-col sm="12">
      <v-img
        :src="aboutUs[0].data.main_image.url"
        gradient="to top right, rgba(36, 36, 36, 0.9), rgba(25,32,72,.7)"
        max-height="336px"
      >
        <v-row align="center" class="lightbox white--text pa-2 fill-height">
          <v-col align="center">
            <h1>{{ aboutUs[0].data.main_image.alt }}</h1>
          </v-col>
        </v-row>
      </v-img>
    </v-col>
    <v-col>
      <v-row cols="12">
        <v-col sm="12">
          <h2>{{ aboutUs[0].data.summary_title[0].text }}</h2>
        </v-col>
        <v-col sm="12">
          <p>{{ aboutUs[0].data.company_summary[0].text }}</p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style lang="css" scoped>
.titleCenter {
  text-align: center;
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { IPrismic } from '~/shims'

@Component({
  components: {},
  computed: mapState('pages', ['aboutUs'])
})
export default class Index extends Vue {
  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    await store.dispatch('pages/getAboutUs', $prismic)
  }
}
</script>
