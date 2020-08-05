<template>
  <span>
    <nuxt-link to="/products">
      <p>Services</p>
    </nuxt-link>
    <nuxt-link to="/products">
      <p>Custom Fabrication</p>
    </nuxt-link>
    <nuxt-link to="/products">
      <p>Technical Guides</p>
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
export default class Group1Links extends Vue {}
</script>