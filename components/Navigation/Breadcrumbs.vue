<template>
  <div>
    <!-- Desktop breadcrumb -->
    <span v-show="!isMobile">
      <v-breadcrumbs dark :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon small>{{ mdiChevronRight }}</v-icon>
        </template>
      </v-breadcrumbs>
    </span>
    <!-- Mobile breadcrumb -->
    <span id="mobileBreadcrumb" v-show="isMobile">
      <v-icon dark small>{{ mdiChevronLeft }}</v-icon>
      <nuxt-link :to="mobileBreadcrumb.to">{{ mobileBreadcrumb.text }}</nuxt-link>
    </span>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'

@Component({
  computed: {
    ...mapState('layout', ['isMobile'])
  }
})
export default class Breadcrumb extends Vue {
  mdiChevronRight = mdiChevronRight
  mdiChevronLeft = mdiChevronLeft

  @Prop() breadcrumbs!: IBreadcrumb[]

  get mobileBreadcrumb() {
    const mobileIndex = this.breadcrumbs.length - 2
    return this.breadcrumbs[mobileIndex]
  }
}
</script>
