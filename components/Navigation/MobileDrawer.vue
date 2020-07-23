<template>
  <div id="mobile-drawer">
    <!-- Workaround for z-index of drawer overlay -->
    <v-overlay :value="mobileDrawer"></v-overlay>
    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="mobileDrawer"
      app
      fixed
      hide-overlay
      disable-resize-watcher
      class="pb-16"
    >
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
        <v-list-group
          v-for="navOption in mainNavigation"
          :key="navOption.primary.link.id"
          active-class="deep-purple--text text--accent-4"
        >
          <!-- Dropdown title -->
          <template v-slot:activator>
            <v-list-item two-line :nuxt="true">{{
              navOption.primary.label[0].text
            }}</v-list-item>
          </template>
          <!-- Sub Nav Options -->
          <v-list-item
            v-for="subNavOption in navOption.items"
            :key="subNavOption.sub_nav_link.id"
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
            <v-list-item-subtitle>{{
              subNavOption.sub_nav_link_label[0].text
            }}</v-list-item-subtitle>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped lang="css"></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('layout', ['mainNavigation']),
    mobileDrawer: {
      get() {
        return this.$store.state.layout.mobileDrawer
      },
      set(value) {
        this.$store.commit('layout/setMobileDrawer', value)
      }
    }
  }
})
export default class MobileDrawer extends Vue {}
</script>
