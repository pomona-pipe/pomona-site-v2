<template>
  <span>
    <nuxt-link to="/about-us">
      <p>Our Company</p>
    </nuxt-link>
    <nuxt-link to="/about-us/contact">
      <p>Contact</p>
    </nuxt-link>
    <nuxt-link to="/about-us/team">
      <p>Team</p>
    </nuxt-link>
  </span>
</template>

<style scoped lang="scss">
a {
    text-decoration: none;
    color: #BDBDBD;
    &:hover {
        color: #ffffff;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'


@Component({})
export default class Group2Links extends Vue {}
</script>