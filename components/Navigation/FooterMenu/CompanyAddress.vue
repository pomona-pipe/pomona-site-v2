<template>
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
export default class CompanyAddress extends Vue {}
</script>