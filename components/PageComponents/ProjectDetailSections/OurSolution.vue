<template>
  <section class="page">
    <v-row class="mx-0">
      <v-col class="px-0" cols="11" md="5">
        <v-img
          class="rounded-r-xl"
          :src="document.data.our_solution_image.fileUrl"
        ></v-img>
      </v-col>
      <v-col class="pl-0" cols="10" offset="1" md="5">
        <h2>Our Solution</h2>
        <prismic-rich-text :field="document.data.our_solution_paragraph" />
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
export default class OurSolution extends Vue {}
</script>
