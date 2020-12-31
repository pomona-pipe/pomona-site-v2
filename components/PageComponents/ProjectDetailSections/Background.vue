<template>
  <section class="page">
    <v-row class="mx-0">
      <v-col class="px-0" order-md="2" cols="11" offset="1" md="5">
        <v-img
          class="rounded-l-xl"
          :src="document.data.background_image.fileUrl"
        ></v-img>
      </v-col>
      <v-col class="pl-0" order-md="1" cols="10" offset="1" md="5">
        <h2>Background</h2>
        <prismic-rich-text :field="document.data.background_paragraph" />
      </v-col>
    </v-row>
  </section>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  props: ['document']
})
export default class Background extends Vue {}
</script>
