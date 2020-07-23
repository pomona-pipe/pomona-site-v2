<template>
  <v-app-bar
    app
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
        @click.stop="mobileDrawer = !mobileDrawer"
      ></v-app-bar-nav-icon>
      <!-- Company Logo -->
      <div>
        <nuxt-link to="/">
          <img src="~/assets/logo_xlarge.png" class="pomona_logo" />
        </nuxt-link>
      </div>
      <div class="d-flex">
        <!-- Desktop Navigation Menu -->
        <div v-show="!isMobile" id="desktop-menu">
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
                height="48px"
                v-on="on"
                >{{ navOption.primary.label[0].text }}</v-btn
              >
            </template>

            <!-- Repeat Section -->
            <v-list>
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
        <!-- Search Icon -->
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped lang="css">
.pomona_logo {
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

@Component({
  computed: {
    ...mapState('layout', ['isMobile', 'mainNavigation']),
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
export default class Header extends Vue {}
</script>
