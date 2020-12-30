<template>
  <!-- Value Prop Section -->
  <section>
    <v-container>
      <!-- Value Prop Section title -->
      <div class="text-center">
        <prismic-rich-text :field="home[0].data.value_prop_title" />
        <p class="subtitle">{{ home[0].data.value_prop_subtitle }}</p>
      </div>
      <!-- Value Props -->
      <v-row class="mt-12 text-center">
        <!-- prop 1 -->
        <v-col cols="12" md="4">
          <v-icon size="150" color="blue-grey">{{ mdiDraw }}</v-icon>
          <prismic-rich-text :field="home[0].data.prop_1_title" />
          <p>{{ home[0].data.prop_1_subtitle }}</p>
        </v-col>
        <!-- prop 2 -->
        <v-col cols="12" md="4">
          <v-icon size="150" color="blue-grey">{{ mdiTools }}</v-icon>
          <prismic-rich-text :field="home[0].data.prop_2_title" />
          <p>{{ home[0].data.prop_2_subtitle }}</p>
        </v-col>
        <!-- prop 3 -->
        <v-col cols="12" md="4">
          <v-icon size="150" color="blue-grey">{{ mdiExcavator }}</v-icon>
          <prismic-rich-text :field="home[0].data.prop_3_title" />
          <p>{{ home[0].data.prop_3_subtitle }}</p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
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
