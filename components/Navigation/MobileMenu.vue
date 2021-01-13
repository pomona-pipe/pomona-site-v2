<template>
  <v-list rounded nav dense>
    <v-list-item-group>
      <v-list-item two-line to="/" class="px-4" active-class="primary--text">
        <v-list-item-icon class="mr-4 align-self-center">
          <v-icon>{{ mdiHome }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="text-center">Home</v-list-item-content>
      </v-list-item>
    </v-list-item-group>
    <div
      v-for="navOption in mainNavigation"
      :key="`mobile-${navOption.primary.link.id}`"
    >
      <!-- single nav option -->
      <v-list-item-group v-if="navOption.items.length === 0">
        <v-list-item
          two-line
          :nuxt="true"
          :to="{
            path: linkResolver(navOption.primary.link)
          }"
          class="pr-4 pl-6"
          active-class="primary--text"
        >
          <v-list-item-content>
            {{ navOption.primary.label[0].text }}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <!-- dropdown nav option -->
      <v-list-group v-else>
        <!-- Dropdown title -->
        <template v-slot:activator>
          <v-list-item class="px-4" two-line :nuxt="true">
            {{ navOption.primary.label[0].text }}
          </v-list-item>
        </template>
        <!-- Dropdown Items -->
        <v-list-item
          v-for="subNavOption in navOption.items"
          :key="`mobile-${subNavOption.sub_nav_link.id}`"
          :nuxt="true"
          :to="{
            path: linkResolver(subNavOption.sub_nav_link)
          }"
          class="pl-8"
          two-line
          exact
        >
          <v-list-item-subtitle>
            {{ subNavOption.sub_nav_link_label[0].text }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list-group>
    </div>
  </v-list>
</template>

<style scoped lang="css">
.v-list-item__subtitle {
  color: inherit !important;
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import { mdiHome } from '@mdi/js'
import linkResolver from '~/plugins/link-resolver'

@Component({
  computed: {
    ...mapState('layout', ['mainNavigation'])
  }
})
export default class MobileMenu extends Vue {
  linkResolver = linkResolver
  mdiHome = mdiHome
}
</script>
