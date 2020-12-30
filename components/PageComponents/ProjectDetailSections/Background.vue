<template>
  <section class="page">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h2>Background</h2>
          <prismic-rich-text :field="document.data.background_paragraph" />
        </v-col>
        <v-col cols="12" md="6">
          <v-img :src="document.data.background_image.fileUrl"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { Route } from 'vue-router/types'
import { find } from 'lodash'
import { IPrismic, IPrismicDocument } from '~/shims'

@Component({})
export default class Background extends Vue {
  document: IPrismicDocument | null = null

  // fetch project from store and copy to component
  created() {
    const uid = this.$route.params.uid
    this.document = find(this.$store.state.projects.projects, { uid })
  }
}
</script>
