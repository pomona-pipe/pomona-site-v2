<template>
  <section class="hero" :style="heroStyles">
    <v-container>
      <v-row align="center" class="fill-height">
        <v-col align="center">
          <div class="grey--text text--lighten-2">
            <prismic-rich-text :field="home[0].data.hero_title" />
          </div>
          <div>
            <p class="subtitle">{{ home[0].data.hero_subtitle }}</p>
          </div>
          <v-hover v-slot:default="{ hover }">
            <v-btn
              to="/about-us"
              rounded
              large
              color="primary"
              :outlined="hover ? true : false"
              >Learn More</v-btn
            >
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'

@Component({
  components: {},
  computed: {
    ...mapState('pages', ['home']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${this.$store.state.pages.home[0].data.hero_image.fileUrl}")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class Hero extends Vue {}
</script>
