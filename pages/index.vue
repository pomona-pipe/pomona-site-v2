<template>
  <div class="page">
    <Hero />
    <ValueProp />
    <CustomerReach />
    <CustomerLogo />
    <FeaturedProjects />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import pageVisits from '~/services/pageVisits'
import { IPrismic } from '~/shims'
import Hero from '~/components/PageComponents/Home/Hero.vue'
import ValueProp from '~/components/PageComponents/Home/ValueProp.vue'
import CustomerReach from '~/components/PageComponents/Home/CustomerReach.vue'
import CustomerLogo from '~/components/PageComponents/Home/CustomerLogo.vue'
import FeaturedProjects from '~/components/PageComponents/Home/FeaturedProjects.vue'

@Component({
  components: {
    Hero,
    ValueProp,
    CustomerReach,
    CustomerLogo,
    FeaturedProjects
  },
  computed: {

  }
})
export default class Index extends Vue {

  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getHome', $prismic)
    await store.dispatch('projects/getProjects', $prismic)
  }
}
</script>
