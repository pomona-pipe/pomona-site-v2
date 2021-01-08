<template>
  <span>
    <!-- Desktop Layout -->
      <v-row id="desktop-footer" class="hidden-xs-only" justify="space-between">
        <v-col class="flex-grow-0">
          <!-- Address and contact info -->
          <CompanyAddress />
        </v-col>

        <v-col class="flex-grow-0">
          <!-- group 1 -->
          <Group1Links />
        </v-col>

        <v-col class="flex-grow-0">
          <!-- group 2 -->
          <Group2Links />
        </v-col>
      </v-row>


    <!-- Mobile Layout -->
      <v-row id="mobile-footer" cols="12" class="hidden-sm-and-up" >
        <v-col>
          <CompanyAddress />
        </v-col>

        <v-col>
          <v-divider></v-divider>
        </v-col>

        <v-col>
          <Group1Links />
        </v-col>

        <v-col>
          <v-divider></v-divider>
        </v-col>

        <v-col>
          <Group2Links />
        </v-col>
      </v-row>
  </span>
</template>

<style scoped lang="scss">

#mobile-footer > .col {
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  text-align: center;

}

.col > * {
  white-space: nowrap;
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import CompanyAddress from '~/components/Navigation/FooterMenu/CompanyAddress.vue'
import Group1Links from '~/components/Navigation/FooterMenu/Group1-links.vue'
import Group2Links from '~/components/Navigation/FooterMenu/Group2-links.vue'

@Component({
  components: {
    CompanyAddress,
    Group1Links,
    Group2Links
  }
})
export default class FooterMenu extends Vue {}
</script>
