<template>
  <div v-if="slices.length > 0" class="product-detail-sections"> 
    <section v-for="(slice, index) in slices" :key="`slice-${index}`">
      <!-- Gallery with text Slice component -->
      <template v-if="slice.slice_type === 'gallery_with_text'">
        <GalleryWithText :slice="slice" />
      </template>
      <!-- Video with text Slice component  -->
      <template v-if="slice.slice_type === 'video_with_text'">
        <VideoWithText :slice="slice" /> 
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { find } from 'lodash'
import { Route } from 'vue-router/types'
import { IPrismic, IPrismicDocument } from '~/shims'
import GalleryWithText from '~/components/PageComponents/ProductDetail/Slices/GalleryWithText.vue'
import VideoWithText from '~/components/PageComponents/ProductDetail/Slices/VideoWithText.vue'

@Component({
  props: ['slices'],
  components: {
    GalleryWithText,
    VideoWithText
  }
})
export default class SlicesBlock extends Vue {}
</script>