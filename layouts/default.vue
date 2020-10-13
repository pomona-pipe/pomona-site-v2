<template>
  <v-app
    v-resize="checkIsMobile"
    :class="{ 'no-scroll': mobileDrawer && isMobile }"
  >
    <Header />
    <MobileDrawer v-show="isMobile" />
    <!-- Application Content -->
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>
<style lang="css" scoped>
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
import { Context } from '@nuxt/types'
import { mapState } from 'vuex'
import Header from '~/components/Layout/Header.vue'
import Footer from '~/components/Layout/Footer.vue'
import MobileDrawer from '~/components/Navigation/MobileDrawer.vue'

@Component({
  components: {
    Header,
    MobileDrawer,
    Footer
  },
  computed: {
    ...mapState('layout', ['mainNavigation', 'isMobile']),
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
  checkIsMobile() {
    const isMobile = window.innerWidth < this.$vuetify.breakpoint.thresholds.md
    this.$store.commit('layout/setIsMobile', isMobile)
  }

  async middleware({ route, store, $prismic }: Context) {
    // update router history: matched property excluded since it causes app to crash
    const {
      path,
      name,
      hash,
      query,
      params,
      fullPath,
      redirectedFrom,
      meta
    } = route
    store.commit('layout/updateRouterHistory', {
      path,
      name,
      hash,
      query,
      params,
      fullPath,
      redirectedFrom,
      meta
    })
    if (store.state.layout.routerHistory.length > 1) return
    await store.dispatch('layout/getMainNavigation', $prismic)
    await store.dispatch('layout/getFooterNavigation', $prismic)
  }
}
</script>
