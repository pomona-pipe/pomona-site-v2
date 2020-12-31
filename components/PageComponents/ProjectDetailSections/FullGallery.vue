<template>
  <section class="page">
    <v-container>
      <h2 class="text-center">Full Gallery</h2>
      <v-row justify="center" class="fill-height">
        <v-col cols="12" align="start">
          <v-carousel class="rounded-xl img-overflow-mask" show-arrows-on-hover>
            <v-carousel-item
              v-for="image in document.data.image_gallery"
              :key="image.id"
              :src="image.project_image.fileUrl"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  props: ['document']
})
export default class FullGallery extends Vue {}
</script>
