<template>
  <section class="page">
    <v-container>
      <h2 class="text-center">Our Solution</h2>
       <!-- mobile: stacked -->
      <v-row class="hidden-md-and-up">
        <v-col cols="12">
          <prismic-rich-text :field="document.data.our_solution_paragraph" />
        </v-col>
        <v-col cols="12">
          <v-img :src="document.data.our_solution_image.url"></v-img>
        </v-col>
      </v-row>
      <!-- desktop: float layout -->
      <div class="hidden-sm-and-down">
        <div class="float-md-left img-float-md">
          <v-img :src="document.data.our_solution_image.url"></v-img>
        </div>
        <div>
          <prismic-rich-text :field="document.data.our_solution_paragraph" />
        </div>
        <div style="clear: both"></div>
      </div>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { Route } from 'vue-router/types'
import { find } from 'lodash'
import { IPrismic, IPrismicDocument } from '~/shims'

@Component({})
export default class OurSolution extends Vue {
  document: IPrismicDocument | null = null

  // fetch project from store and copy to component
  created() {
    const uid = this.$route.params.uid
    this.document = find(this.$store.state.projects.projects, { uid })
  }
}
</script>
