<template>
  <v-list nav dense>
    <v-list-item-group>
      <v-list-item
        two-line
        to="/"
        active-class="deep-purple--text text--accent-4"
      >
        <v-list-item-icon class="mr-4 align-self-center">
          <v-icon x-large>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>Home</v-list-item-content>
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
          :to="`/${navOption.primary.link.uid}`"
          class="px-4"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item-content>
            {{ navOption.primary.label[0].text }}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <!-- dropdown nav option -->
      <v-list-group v-else active-class="deep-purple--text text--accent-4">
        <!-- Dropdown title -->
        <template v-slot:activator>
          <v-list-item two-line :nuxt="true">
            {{ navOption.primary.label[0].text }}
          </v-list-item>
        </template>
        <!-- Dropdown Items -->
        <v-list-item
          v-for="subNavOption in navOption.items"
          :key="`mobile-${subNavOption.sub_nav_link.id}`"
          :nuxt="true"
          :to="{
            path:
              navOption.primary.link.uid === subNavOption.sub_nav_link.uid
                ? `/${navOption.primary.link.uid}`
                : `/${navOption.primary.link.uid}/${subNavOption.sub_nav_link.uid}`
          }"
          active-class="deep-purple--text text--accent-4"
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

<style scoped lang="css"></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('layout', ['mainNavigation'])
  }
})
export default class MobileMenu extends Vue {}
</script>
