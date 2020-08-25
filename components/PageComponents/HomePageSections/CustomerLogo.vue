<template>
  <section>
    <!-- Customer Logos Section -->
    <v-row>
      <v-col cols="12" class="text-center">
        <prismic-rich-text :field="home[0].data.customer_logo_title" />
      </v-col>
      <v-col v-for="logo in home[0].data.customer_logos" :key="logo.id">
        <v-img :src="logo.image.url" max-height="150px" max-width="100px"></v-img>
      </v-col>
    </v-row>
    <hr />
  </section>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'

@Component({
  components: {},
  computed: {
    ...mapState('pages', ['home'])
  }
})
export default class CustomerLogo extends Vue {}
</script>
