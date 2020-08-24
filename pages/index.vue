<template>
  <span>
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
              <prismic-rich-text :field="home[0].data.hero_subtitle" />
            </v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>
    <!-- Value Prop Section -->
    <v-row cols="12">
      <!-- Value Prop Section title -->
      <v-col sm="12" class="text-center">
        <prismic-rich-text :field="home[0].data.value_prop_title" />
        <prismic-rich-text :field="home[0].data.value_prop_subtitle" />
      </v-col>
      <!-- prop 1 -->
      <v-col class="text-center">
        <v-icon size="75" color="blue darken-2">{{ mdiDraw }}</v-icon>
        <prismic-rich-text :field="home[0].data.prop_1_title" />
        <prismic-rich-text :field="home[0].data.prop_1_subtitle" />
      </v-col>
      <!-- prop 2 -->
      <v-col class="text-center">
        <v-icon size="75" color="purple darken-3" >{{ mdiTools }}</v-icon>
        <prismic-rich-text :field="home[0].data.prop_2_title" />
        <prismic-rich-text :field="home[0].data.prop_2_subtitle" />
      </v-col>
      <!-- prop 3 -->
      <v-col class="text-center">
        <v-icon size="75" color="green darken-2">{{ mdiExcavator }}</v-icon>
        <prismic-rich-text :field="home[0].data.prop_3_title" />
        <prismic-rich-text :field="home[0].data.prop_3_subtitle" />
      </v-col>
    </v-row>
  </span>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { mdiTools, mdiDraw, mdiExcavator } from '@mdi/js'
import pageVisits from '~/services/pageVisits'
import { IPrismic } from '~/shims'

@Component({
  components: {},
  computed: {
    ...mapState('pages', ['home'])
  }
})
export default class Index extends Vue {
  mdiTools = mdiTools
  mdiDraw = mdiDraw
  mdiExcavator = mdiExcavator

  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getHome', $prismic)
  }
}
</script>
