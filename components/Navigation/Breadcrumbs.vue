<template>
  <div>
    <!-- Mobile breadcrumb -->
    <div class="hidden-md-and-up">
      <ul class="v-breadcrumbs theme--dark">
        <li>
          <nuxt-link :to="mobileBreadcrumb.to" class="v-breadcrumbs__item">
            <v-icon dark small>{{ mdiChevronLeft }}</v-icon>
            {{ mobileBreadcrumb.text }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <!-- Desktop breadcrumb -->
    <div class="hidden-sm-and-down">
      <v-breadcrumbs dark :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon small>{{ mdiChevronRight }}</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
  </div>
</template>
<style lang="scss" scoped>
::v-deep {
  .v-breadcrumbs {
    position: absolute;
    padding: 0px 16px !important;
    top: 112px;
    left: 0px;
    li {
      display: inline !important;
      .v-breadcrumbs__item {
        color: var(--v-primary-lighten3) !important;
        display: inline !important;
        &.v-breadcrumbs__item--disabled {
          color: #e0e0e0 !important;
        }
        .v-icon {
          color: var(--v-primary-lighten3) !important;
        }
      }
    }
  }
}
</style>
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
