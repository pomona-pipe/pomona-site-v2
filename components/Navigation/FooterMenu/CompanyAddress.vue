<template>
  <address>
    <div class="d-flex align-start">
      <v-icon class="mt-1 mr-1">{{ mdiMapMarker }}</v-icon>
      <p>
        4611 Dundas Dr.
        <br />Greensboro, NC 27407
      </p>
    </div>
    <p>
      <a class="text-decoration-none" href="tel:3362928060">
        <v-icon class="mr-1">{{ mdiPhone }}</v-icon>
        <span class="text-decoration-underline"
          >336&centerdot;292&centerdot;8060</span
        >
      </a>
    </p>
    <p class="mb-0">
      <v-icon class="mr-1" >{{ mdiFax }}</v-icon>
      <span>336&centerdot;292&centerdot;2251</span>
    </p>
  </address>
</template>
<style scoped lang="scss">
a {
  text-decoration: none;
  color: #bdbdbd !important;
  &:hover {
    color: #ffffff !important;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mdiMapMarker, mdiPhone, mdiFax } from '@mdi/js'

@Component({})
export default class CompanyAddress extends Vue {
  mdiMapMarker = mdiMapMarker
  mdiPhone = mdiPhone
  mdiFax = mdiFax
}
</script>
