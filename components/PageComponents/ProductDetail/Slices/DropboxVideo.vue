<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" class="text-center">
        <prismic-rich-text :field="slice.primary.video_title" />
        <prismic-rich-text :field="slice.primary.video_text" />
      </v-col>
      <v-col cols="12" md="12">
        <v-responsive
          style="max-height: 70vh; max-width: 124.5vh"
          class="mx-auto"
          :aspect-ratio="16 / 9"
        >
          <video width="100%" height="100%" controls controlsList="nodownload">
              <source :src="slice.primary.video_link.fileUrl" type="video/mp4">
          Your browser does not support the video tag.
          </video>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { find } from 'lodash'
import { Route } from 'vue-router/types'
import { IPrismic, IPrismicDocument } from '~/shims'
@Component({
  props: ['slice'],
  computed: {
    ...mapState('layout', ['placeholders'])
  }
})
export default class DropboxVideo extends Vue {}
</script>
