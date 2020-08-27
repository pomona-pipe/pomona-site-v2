<template>
  <v-app-bar
    fixed
    color="#303030"
    dark
    hide-on-scroll
    scroll-threshold="100"
    dense
    prominent
  >
    <div
      class="d-flex justify-space-between align-center flex-no-wrap appBarContent"
    >
      <!-- Mobile Hamburger Menu Button -->
      <v-app-bar-nav-icon
        v-show="isMobile"
        default="mdiMenu"
        @click.stop="mobileDrawer = !mobileDrawer"
      ></v-app-bar-nav-icon>
      <!-- Company Logo -->
      <nuxt-link to="/">
        <img src="/images/logo_xlarge.png" class="pomona_logo" />
      </nuxt-link>
      <div class="d-flex">
        <!-- Desktop Navigation Menu -->
        <DesktopMenu v-show="!isMobile" />
        <!-- Search Icon -->
        <v-btn icon>
          <v-icon>{{ mdiMagnify }}</v-icon>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped lang="scss">
.v-app-bar {
  a,
  button {
    opacity: 0.7;
    will-change: opacity;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }
}
.pomona_logo {
  max-width: 100%;
  max-height: 48px;
  margin: auto;
}
.appBarContent {
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import { mdiMenu, mdiMagnify } from '@mdi/js'
import DesktopMenu from '~/components/Navigation/DesktopMenu.vue'

@Component({
  components: {
    DesktopMenu
  },
  computed: {
    ...mapState('layout', ['isMobile']),
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
export default class Header extends Vue {
  mdiMenu = mdiMenu
  mdiMagnify = mdiMagnify
}
</script>
