<template>
  <v-footer class="d-block py-2" dark color="#303030">
    <v-container>
      <v-row>
        <v-col>
          <nuxt-link to="/">
            <img src="/logo_xlarge.png" class="pomona_logo" />
          </nuxt-link>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row cols="12">
        <v-col>
          <address>
            <div class="d-flex align-start">
              <v-icon class="mt-1">mdi-map-marker</v-icon>
              <p>
                4611 Dundas Dr.
                <br />Greensboro, NC 27407
              </p>
            </div>
            <p>
              <a class="text-decoration-none white--text" href="tel:3362928060">
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
      </v-row>

      <v-divider></v-divider>

      <v-row class="text-center">
        <v-col>
          <v-btn x-large icon target="_blank" href="https://www.facebook.com/pomonapipe/">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            x-large
            icon
            target="_blank"
            href=" https://www.linkedin.com/company/pomona-pipe-products-company/about/"
          >
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>

          <v-btn x-large icon target="_blank" href="https://twitter.com/pomonapipe">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>

          <v-btn
            x-large
            icon
            target="_blank"
            href="https://www.youtube.com/channel/UCU-5iXYqGmWH3w0BZ0tq9RA"
          >
            <v-icon>mdi-youtube</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="text-center">
        <v-col>&copy; {{ new Date().getFullYear() }} Pomona Pipe Products, Inc. All rights reserved</v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped lang="css">
.pomona_logo {
  max-height: 40px;
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

@Component({})
export default class Footer extends Vue {}
</script>
