<template>
  <div id="desktop-menu">
    <v-menu
      v-for="navOption in mainNavigation"
      :key="`desktop-${navOption.primary.link.id}`"
      open-on-hover
      bottom
      offset-y
    >
      <!-- Non-repeat Section -->
      <template v-slot:activator="{ on }">
        <v-btn
          class="rounded-pill"
          :nuxt="true"
          :to="{ path: linkResolver(navOption.primary.link) }"
          color="transparent"
          dark
          depressed
          height="48px"
          v-on="on"
          >{{ navOption.primary.label[0].text }}</v-btn
        >
      </template>

      <!-- Repeat Section -->
      <v-list v-if="navOption.items.length > 0" rounded>
        <v-list-item
          v-for="subNavOption in navOption.items"
          :key="`desktop-${subNavOption.sub_nav_link.id}`"
          :nuxt="true"
          :to="{
            path: linkResolver(subNavOption.sub_nav_link)
          }"
          text
          dense
          active-class="primary--text"
          exact
        >
          <v-list-item-title>
            {{ subNavOption.sub_nav_link_label[0].text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped lang="css"></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import linkResolver from '~/plugins/link-resolver'

@Component({
  computed: {
    ...mapState('layout', ['mainNavigation'])
  }
})
export default class DesktopMenu extends Vue {
  linkResolver = linkResolver
}
</script>
