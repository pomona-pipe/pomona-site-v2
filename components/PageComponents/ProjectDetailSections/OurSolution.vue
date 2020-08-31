<template>
  <section class="page">
    <v-container>
      <h2>Our Solution:</h2>
      <v-row justify="start" class="fill-height">
        <v-col cols="12" md="6" align="start">
          <v-img :src="document.data.our_solution_image.url"></v-img>
        </v-col>
        <v-col cols="12" md="6" align="center">
          <prismic-rich-text :field="document.data.our_solution_paragraph" />
        </v-col>
      </v-row>
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
