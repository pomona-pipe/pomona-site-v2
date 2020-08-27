<template>
  <v-footer class="d-block py-2" dark color="#303030">
    <v-container>
      <v-row>
        <!-- Company Logo -->
        <v-col class="text-center text-sm-left">
          <nuxt-link to="/">
            <img src="/images/logo_xlarge.png" class="pomona_logo" />
          </nuxt-link>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <!-- Company address and Page links -->
      <FooterMenu />

      <v-divider></v-divider>
      <!-- Social Media Icons -->
      <v-row class="text-center">
        <v-col>
          <v-btn
            x-large
            icon
            target="_blank"
            href="https://www.facebook.com/pomonapipe/"
          >
            <v-icon>{{ mdiFacebook }}</v-icon>
          </v-btn>
          <v-btn
            x-large
            icon
            target="_blank"
            href=" https://www.linkedin.com/company/pomona-pipe-products-company/about/"
          >
            <v-icon>{{ mdiLinkedin }}</v-icon>
          </v-btn>

          <v-btn
            x-large
            icon
            target="_blank"
            href="https://twitter.com/pomonapipe"
          >
            <v-icon>{{ mdiTwitter }}</v-icon>
          </v-btn>

          <v-btn
            x-large
            icon
            target="_blank"
            href="https://www.youtube.com/channel/UCU-5iXYqGmWH3w0BZ0tq9RA"
          >
            <v-icon>{{ mdiYoutube }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <!-- legal info -->
      <v-row class="text-center">
        <v-col
          >&copy; {{ new Date().getFullYear() }} Pomona Pipe Products, Inc. All
          rights reserved</v-col
        >
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped lang="scss">
.v-footer {
  a,
  button {
    opacity: 0.7;
    will-change: opacity;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }
}
footer {
  color: #bdbdbd !important;
}
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
import { mdiFacebook, mdiTwitter, mdiLinkedin, mdiYoutube } from '@mdi/js'
import FooterMenu from '~/components/Navigation/FooterMenu/FooterMenu.vue'

@Component({
  components: {
    FooterMenu
  },
  computed: {
    ...mapState('layout', ['mainNavigation'])
  }
})
export default class Footer extends Vue {
  mdiFacebook = mdiFacebook
  mdiTwitter = mdiTwitter
  mdiLinkedin = mdiLinkedin
  mdiYoutube = mdiYoutube

}
</script>
