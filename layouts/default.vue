<template>
  <v-app v-resize="checkIsMobile" :class="{ 'no-scroll': mobileDrawer }">
    <Header />
    <MobileDrawer v-show="isMobile" />
    <!-- Application Content -->
    <v-main>
      <v-container fluid class="py-0">
        <nuxt />
      </v-container>
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
import { Store, mapState } from 'vuex'
import { IPrismic } from '~/shims'
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
    if (store.state.layout.mainNavigation.length === 0)
      await store.dispatch('layout/getMainNavigation', $prismic)
    if (store.state.layout.footerNavigation.length === 0)
      await store.dispatch('layout/getFooterNavigation', $prismic)
    if (store.state.products.productCategories.length === 0)
      await store.dispatch('products/getProductCategories', $prismic)
  }
}
</script>
