<template>
  <section class="page">
    <h2 class="text-center">Full Gallery:</h2>
    <v-row justify="center" class="fill-height">
      <v-col cols="12" align="start">
        <v-carousel show-arrows-on-hover >
          <v-carousel-item
            v-for="image in document.data.image_gallery"
            :key="image.id"
            :src="image.project_image.url"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
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
export default class FullGallery extends Vue {
  document: IPrismicDocument | null = null

  // fetch project from store and copy to component
  created() {
    const uid = this.$route.params.uid
    this.document = find(this.$store.state.projects.projects, { uid })
  }
}
</script>
