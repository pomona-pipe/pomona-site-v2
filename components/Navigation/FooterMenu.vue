<template>
  <v-row id="footer-menu" align="center" justify="space-between">
    <!-- Address and contact info -->
    <v-col class="flex-grow-0">
      <address>
        <div class="d-flex align-start">
          <v-icon class="mt-1">mdi-map-marker</v-icon>
          <p>
            4611 Dundas Dr.
            <br />Greensboro, NC 27407
          </p>
        </div>
        <p>
          <a class="text-decoration-none" href="tel:3362928060">
            <v-icon medium>mdi-phone</v-icon>
            <span class="text-decoration-underline">336&centerdot;292&centerdot;8060</span>
          </a>
        </p>
        <p>
          <v-icon medium>mdi-fax</v-icon>
          <span>336&centerdot;292&centerdot;2251</span>
        </p>
      </address>
    </v-col>
    <!-- group 1 -->
    <v-col class="flex-grow-0">
      <nuxt-link to="/products">
        <p>Services</p>
      </nuxt-link>
      <nuxt-link to="/products">
        <p>Custom Fabrication</p>
      </nuxt-link>
      <nuxt-link to="/products">
        <p>Technical Guides</p>
      </nuxt-link>
    </v-col>
    <!-- group 2 -->
    <v-col class="flex-grow-0">
      <nuxt-link to="/about-us">
        <p>Our Company</p>
      </nuxt-link>
      <nuxt-link to="/about-us/contact">
        <p>Contact</p>
      </nuxt-link>
      <nuxt-link to="/about-us/team">
        <p>Team</p>
      </nuxt-link>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
a {
    text-decoration: none;
    color: #BDBDBD;
    &:hover {
        color: #ffffff;
    }
}
    
.col > * {
  white-space: nowrap;
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('layout', ['mainNavigation'])
  }
})
export default class FooterMenu extends Vue {}
</script>
