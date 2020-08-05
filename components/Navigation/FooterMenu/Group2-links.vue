<template>
  <div>
    <p v-for="footerLink in footerNavigation[0].data.group_2" :key="footerLink.id">
      <prismic-link :field="footerLink.link">{{footerLink.label}}</prismic-link>
    </p>
  </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #bdbdbd;
  &:hover {
    color: #ffffff;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('layout', ['footerNavigation'])
  }
})
export default class Group1Links extends Vue {}
</script>