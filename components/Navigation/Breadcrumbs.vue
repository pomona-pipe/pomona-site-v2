<template>
  <div>
    <v-breadcrumbs dark :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon small>{{ mdiChevronRight }}</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import { mdiChevronRight } from '@mdi/js'

@Component({})
export default class Breadcrumb extends Vue {
  mdiChevronRight = mdiChevronRight

  @Prop() breadcrumbs!: IBreadcrumb[]
}
</script>
