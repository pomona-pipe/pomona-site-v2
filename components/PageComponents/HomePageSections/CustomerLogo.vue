<template>
  <section>
    <!-- Customer Logos Section -->
    <v-container>
      <prismic-rich-text class="text-center" :field="home[0].data.customer_logo_title" />
      <v-row class="justify-space-around">
        <v-col class="flex-grow-0" v-for="logo in home[0].data.customer_logos" :key="logo.id">
          <v-img :src="logo.image.url" max-height="200px" max-width="150px"></v-img>
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

@Component({
  components: {},
  computed: {
    ...mapState('pages', ['home'])
  }
})
export default class CustomerLogo extends Vue {}
</script>
