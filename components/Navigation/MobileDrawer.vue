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
      <MobileMenu />
    </v-navigation-drawer>
  </div>
</template>

<style scoped lang="css"></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MobileMenu from '~/components/Navigation/MobileMenu.vue'

@Component({
  components: {
    MobileMenu
  },
  computed: {
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
