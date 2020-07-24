<template>
  <v-row cols="12">
    <v-col sm="12" class="px-0 py-0">
      <v-img
        :src="aboutUs[0].data.main_image.url"
        gradient="to top right, rgba(36, 36, 36, 0.9), rgba(25,32,72,.7)"
        max-height="250px"
      >
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <h2 class="subheader">{{ aboutUs[0].data.main_title[0].text }}</h2>
            <h1 class="header">{{ aboutUs[0].data.main_image.alt }}</h1>
          </v-col>
        </v-row>
      </v-img>
    </v-col>
    <v-col class="center align column">
      <v-row cols="12" justify="center" >
        <v-col sm="12" align="center">
          <h1>{{ aboutUs[0].data.summary_title[0].text }}</h1>
        </v-col>
        <v-col sm="12">
          <p class="paragraph">{{ aboutUs[0].data.company_summary[0].text }}</p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style lang="css" scoped>
.subheader {
  color: #cccccc;
}
.header {
  color: #ffffff
}
.paragraph {
  color: #666666;
  padding-left: 10%;
  padding-right: 10%;
  font-size: x-large;
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
