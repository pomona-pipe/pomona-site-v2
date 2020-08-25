<template>
  <section>
    <!-- Value Prop Section -->
    <v-row cols="12">
      <!-- Value Prop Section title -->
      <v-col sm="12" class="text-center">
        <prismic-rich-text :field="home[0].data.value_prop_title" />
        <p>{{ home[0].data.value_prop_subtitle }}</p>
      </v-col>
      <!-- prop 1 -->
      <v-col class="text-center">
        <v-icon size="150" color="yellow darken-3">{{ mdiDraw }}</v-icon>
        <prismic-rich-text :field="home[0].data.prop_1_title" />
        <p>{{ home[0].data.prop_1_subtitle }}</p>
      </v-col>
      <!-- prop 2 -->
      <v-col class="text-center">
        <v-icon size="150" color="orange darken-2">{{ mdiTools }}</v-icon>
        <prismic-rich-text :field="home[0].data.prop_2_title" />
        <p>{{ home[0].data.prop_2_subtitle }}</p>
      </v-col>
      <!-- prop 3 -->
      <v-col class="text-center">
        <v-icon size="150" color="green darken-1">{{ mdiExcavator }}</v-icon>
        <prismic-rich-text :field="home[0].data.prop_3_title" />
        <p>{{ home[0].data.prop_3_subtitle }}</p>
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
import { mdiTools, mdiDraw, mdiExcavator } from '@mdi/js'

@Component({
  components: {},
  computed: {
    ...mapState('pages', ['home'])
  }
})
export default class ValueProp extends Vue {
  mdiTools = mdiTools
  mdiDraw = mdiDraw
  mdiExcavator = mdiExcavator
}
</script>