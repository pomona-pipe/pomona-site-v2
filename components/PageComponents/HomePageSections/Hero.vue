<template>
  <section>
    <v-row cols="12">
      <!-- Hero Banner Section -->
      <v-col sm="12" class="px-0 py-0">
        <v-img
          :src="home[0].data.hero_image.url"
          gradient="to top right, rgba(36, 36, 36, 0.9), rgba(25,32,72,.7)"
          max-height="250px"
          class="white--text"
        >
          <v-row align="center" class="fill-height">
            <v-col align="center">
              <div class="grey--text text--lighten-2">
                <prismic-rich-text :field="home[0].data.hero_title" />
              </div>
              <div>
                <p>{{ home[0].data.hero_subtitle }}</p>
              </div>
            </v-col>
            <v-col cols="12" align="center">
              <v-hover v-slot:default="{ hover }">
                <v-btn
                  to="/about-us"
                  rounded
                  large
                  color="primary"
                  :outlined="hover ? true : false"
                >Learn More</v-btn>
              </v-hover>
            </v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>
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
export default class Hero extends Vue {}
</script>
