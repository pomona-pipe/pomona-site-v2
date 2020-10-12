<template>
  <section class="page">
    <v-container>
      <h2 class="text-center">Background</h2>
      <!-- mobile: stacked -->
      <v-row class="hidden-md-and-up">
        <v-col cols="12">
          <prismic-rich-text :field="document.data.background_paragraph" />
        </v-col>
        <v-col cols="12">
          <v-img :src="document.data.background_image.url"></v-img>
        </v-col>
      </v-row>
      <!-- desktop: float layout -->
      <div class="hidden-sm-and-down">
        <div class="float-md-right img-float-md">
          <v-img :src="document.data.background_image.url"></v-img>
        </div>
        <div>
          <prismic-rich-text :field="document.data.background_paragraph" />
        </div>
        <div style="clear: both"></div>
      </div>
    </v-container>
  </section>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { Route } from 'vue-router/types'
import { find } from 'lodash'
import { Document } from 'prismic-javascript/src/documents'

@Component({})
export default class Background extends Vue {
  document: Document | null = null

  // fetch project from store and copy to component
  created() {
    const uid = this.$route.params.uid
    this.document = find(this.$store.state.projects.projects, { uid })
  }
}
</script>
