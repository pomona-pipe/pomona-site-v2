<template>
  <div class="page">
    <Hero />
    <ValueProp />
    <CustomerReach />
    <SupplierLogo />
    <FeaturedProjects />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { mapState } from 'vuex'
import pageVisits from '~/services/pageVisits'
import Hero from '~/components/PageComponents/Home/Hero.vue'
import ValueProp from '~/components/PageComponents/Home/ValueProp.vue'
import CustomerReach from '~/components/PageComponents/Home/CustomerReach.vue'
import SupplierLogo from '~/components/PageComponents/Home/SupplierLogo.vue'
import FeaturedProjects from '~/components/PageComponents/Home/FeaturedProjects.vue'

@Component({
  components: {
    Hero,
    ValueProp,
    CustomerReach,
    SupplierLogo,
    FeaturedProjects
  },
  computed: {

  }
})
export default class Index extends Vue {

  async fetch({ store, $prismic }: Context) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getHome', $prismic)
    await store.dispatch('projects/getProjects', $prismic)
  }
}
</script>
