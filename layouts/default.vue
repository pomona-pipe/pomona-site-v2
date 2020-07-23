<template>
  <v-app v-resize="checkIsMobile" :class="{ 'no-scroll': mobileDrawer }">
    <Header />
    <MobileDrawer />
    <!-- Application Content -->
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
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
import { Store, mapState } from 'vuex'
import { IPrismic } from '~/shims'
import Header from '~/components/Layout/Header.vue'
import MobileDrawer from '~/components/Navigation/MobileDrawer.vue'

@Component({
  components: {
    Header,
    MobileDrawer
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
    const isMobile = window.innerWidth < this.$vuetify.breakpoint.thresholds.sm
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
