<template>
  <v-app v-resize="checkIsMobile" :class="{'no-scroll': mobileDrawer}">
    <v-app-bar app fixed color="#303030" dark hide-on-scroll scroll-threshold="100" dense prominent>
      <div class="d-flex justify-space-between align-center flex-no-wrap appBarContent">
        <!-- Mobile Hamburger Menu Button -->
        <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="mobileDrawer = !mobileDrawer"></v-app-bar-nav-icon>
        <!-- Company Logo -->
        <div>
          <nuxt-link to="/">
            <img src="~/assets/logo_xlarge.png" class="pomona_logo" />
          </nuxt-link>
        </div>
        <!-- Desktop Navigation Menu -->
        <div class="d-flex">
          <div class="hidden-sm-and-down">
            <v-menu
              v-for="navOption in mainNavigation"
              :key="navOption.primary.link.id"
              open-on-hover
              bottom
              offset-y
            >
              <!-- Non-repeat Section -->
              <template v-slot:activator="{ on }">
                <v-btn
                  :nuxt="true"
                  :to="{ path: `/${navOption.primary.link.uid}` }"
                  color="#303030"
                  dark
                  v-on="on"
                  height="48px"
                >{{ navOption.primary.label[0].text }}</v-btn>
              </template>

              <!-- Repeat Section -->
              <v-list>
                <v-list-item
                  v-for="subNavOption in navOption.items"
                  :key="subNavOption.sub_nav_link.id"
                  :nuxt="true"
                  :to="{ path: navOption.primary.link.uid === subNavOption.sub_nav_link.uid ? `/${navOption.primary.link.uid}` : `/${navOption.primary.link.uid}/${subNavOption.sub_nav_link.uid}` }"
                  text
                  rounded
                  active-class="deep-purple--text text--accent-4"
                  exact
                >
                  <v-list-item-title>
                    {{
                    subNavOption.sub_nav_link_label[0].text
                    }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <!-- Search Icon -->
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
      </div>
    </v-app-bar>
    <!-- Workaround for z-index of drawer overlay -->
    <v-overlay :value="mobileDrawer"></v-overlay>
    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="mobileDrawer" app fixed hide-overlay disable-resize-watcher class="pb-12">
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item two-line to="/" active-class="deep-purple--text text--accent-4">
            <v-list-item-icon>
              <v-icon x-large>mdi-home</v-icon>
            </v-list-item-icon>Home
          </v-list-item>
        </v-list-item-group>
        <v-list-group
          v-for="navOption in mainNavigation"
          :key="navOption.primary.link.id"
          active-class="deep-purple--text text--accent-4"
        >
          <!-- Dropdown title -->
          <template v-slot:activator>
            <v-list-item two-line :nuxt="true">{{ navOption.primary.label[0].text }}</v-list-item>
          </template>
          <!-- Sub Nav Options -->
          <v-list-item
            v-for="subNavOption in navOption.items"
            :key="subNavOption.sub_nav_link.id"
            :nuxt="true"
            :to="{
                path: navOption.primary.link.uid === subNavOption.sub_nav_link.uid ? `/${navOption.primary.link.uid}` : `/${navOption.primary.link.uid}/${subNavOption.sub_nav_link.uid}`
              }"
            active-class="deep-purple--text text--accent-4"
            two-line
            exact
          >
            <v-list-item-subtitle>{{ subNavOption.sub_nav_link_label[0].text }}</v-list-item-subtitle>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!-- Application Content -->
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<style lang="css" scoped>
.pomona_logo {
  max-height: 48px;
  margin: auto;
}
.appBarContent {
  width: 100%;
  height: 100%;
}
.no-scroll {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  overflow: hidden;
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState, mapMutations } from 'vuex'
import { IPrismic } from '~/shims'

@Component({
  components: {},
  computed: {
    ...mapState('layout', ['mainNavigation', 'navLinks', 'isMobile']),
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
export default class DefaultLayout extends Vue {
  checkIsMobile () {
    const isMobile = window.innerWidth < this.$vuetify.breakpoint.thresholds.sm;
    if (!isMobile) {
      this.$store.commit('layout/setMobileDrawer', false)
    }
    this.$store.commit('layout/setIsMobile', isMobile)

  }
  async middleware({
    route,
    store,
    $prismic
  }: {
    route: any
    store: Store<any>
    $prismic: IPrismic
  }) {
    store.commit('layout/setPageUid', route.path)
    store.commit('layout/setPageName', store.state.layout.pageUid)
    await store.dispatch('layout/getMainNavigation', $prismic)
  }
}
</script>
