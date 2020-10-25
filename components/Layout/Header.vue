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
    <!-- App Bar Content -->
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
        <v-btn id="toggle-search-btn" icon :ripple="false" @click="toggleSearch()" >
          <v-icon>{{ mdiMagnify }}</v-icon>
          <v-icon
            v-ripple="{ center: true }"
            id="close-search"
            :class="{ 'collapsible-icon': true, 'icon-expanded': searchBar.open || searchBar.isClosing, 'is-closing': searchBar.isClosing }"
            color="black"
            >{{ mdiClose }}</v-icon
          >
        </v-btn>
      </div>
    </div>
    <!-- Search Bar -->
    <SearchBar ref="searchBar" :class="{'is-open': searchBar.open, 'is-closing': searchBar.isClosing}" />
  </v-app-bar>
</template>

<style scoped lang="scss">
.v-app-bar {
  &:not(.v-app-bar--is-scrolled) {
    background-color: transparent !important;
    box-shadow: none !important;
  }
  a,
  button {
    opacity: 0.7;
    will-change: opacity;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }
  #toggle-search-btn {
    z-index: 1;
  }
  #close-search {
    position: absolute;
    top: 0px;
    right: 12px;
    border-radius: 50%;
    &:hover {
      background-color: #f6f6f6;
    }
    &.is-closing ::v-deep svg {
      opacity: 0;
    }
  }
  .collapsible-icon {
    transition: transform 200ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(-90deg) scale(0.5);
    transform-origin: center;
    visibility: hidden;
    &.icon-expanded {
      transform: rotate(0deg) scale(1);
      visibility: visible;
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
import { mapState, mapMutations, mapActions } from 'vuex'
import { mdiMenu, mdiMagnify, mdiClose } from '@mdi/js'
import DesktopMenu from '~/components/Navigation/DesktopMenu.vue'
import SearchBar from '~/components/Navigation/SearchBar.vue'

@Component({
  components: {
    DesktopMenu,
    SearchBar
  },
  computed: {
    ...mapState('layout', ['isMobile', 'searchBar']),
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
  mdiClose = mdiClose

  async toggleSearch() {
    // build next state
    const { open } = this.$store.state.layout.searchBar
    let payload = {
      open: !open
    }
    if(open) Object.assign(payload, { isClosing: true })
    // toggle search bar
    this.$store.commit('layout/setSearchBar', payload)
    // after opening, focus search bar
    if(payload.open){
      setTimeout(() => {
        ((this.$refs.searchBar as Vue).$children[0] as unknown as HTMLElement).focus()
      }, 150)
    }
    // after closing, clear isClosing transition state
    else {
      setTimeout(() => {
        this.$store.commit('layout/setSearchBar', { isClosing: false })
      }, 100)
    }
  }
}
</script>
