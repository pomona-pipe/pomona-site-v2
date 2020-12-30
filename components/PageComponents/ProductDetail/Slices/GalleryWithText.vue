<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5" :offset-md="index % 2 === 0 ? 1 : 0" :order-md="index % 2 === 0 ? 2 : 1">
        <v-img
          class="rounded-xl"
          v-if="slice.items.length === 1"
          height="500"
          :src="
            slice.items[0].section_image
              ? slice.items[0].section_image.fileUrl
              : placeholders.file
          "
        ></v-img>
        <v-carousel
          class="rounded-xl"
          v-else-if="slice.items.length > 1"
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="image in slice.items"
            :key="image.id"
            :src="image.section_image.fileUrl"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" md="5" :offset-md="index % 2 === 0 ? 0 : 1"   :order-md="index % 2 === 0 ? 1 : 2">
        <prismic-rich-text :field="slice.primary.section_title" />
        <prismic-rich-text :field="slice.primary.section_text" />
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
  props: ['slice', 'index'],
  computed: {
    ...mapState('layout', ['placeholders'])
  }
})
export default class GalleryWithText extends Vue {}
</script>
