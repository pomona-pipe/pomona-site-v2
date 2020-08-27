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
          :nuxt="true"
          :to="{ path: `/${navOption.primary.link.uid}` }"
          color="transparent"
          dark
          depressed
          height="48px"
          v-on="on"
          >{{ navOption.primary.label[0].text }}</v-btn
        >
      </template>

      <!-- Repeat Section -->
      <v-list v-if="navOption.items.length > 0">
        <v-list-item
          v-for="subNavOption in navOption.items"
          :key="`desktop-${subNavOption.sub_nav_link.id}`"
          :nuxt="true"
          :to="{
            path:
              navOption.primary.link.uid === subNavOption.sub_nav_link.uid
                ? `/${navOption.primary.link.uid}`
                : `/${navOption.primary.link.uid}/${subNavOption.sub_nav_link.uid}`
          }"
          text
          rounded
          active-class="deep-purple--text text--accent-4"
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

@Component({
  computed: {
    ...mapState('layout', ['mainNavigation'])
  }
})
export default class DesktopMenu extends Vue {}
</script>
