<template>
  <section class="page">
    <v-container>
      <h2 class="text-center">Overview</h2>
      <v-row
        align="center"
        justify="space-around"
        class="d-block d-sm-flex text-no-wrap"
      >
        <v-col class="flex-sm-grow-0">
          <!-- Project site  -->
          <div>
            <p class="subtitle">Site:</p>
            <p>{{ document.data.name[0].text }}</p>
          </div>
          <!-- project Completion Date  -->
          <div>
            <p class="subtitle">Completion Date:</p>
            <p>
              {{ formatDateString(document.data.overview_completion_date) }}
            </p>
          </div>
          <!-- Products Used  -->
          <div>
            <p class="subtitle">Products:</p>
            <div
              v-for="product in document.data.overview_products"
              :key="product.id"
            >
              <prismic-link :field="product.product">{{
                parseNameFromUid(product.product.uid)
              }}</prismic-link>
            </div>
          </div>
        </v-col>
        <v-col class="flex-sm-grow-0">
          <!-- project location  -->
          <div>
            <p class="subtitle">Location:</p>
            <p>{{ document.data.project_location }}</p>
          </div>
          <!-- Customer Name -->
          <div>
            <p class="subtitle">Customer:</p>
            <p>{{ document.data.overview_customer }}</p>
          </div>
          <!-- Applications -->
          <div>
            <p class="subtitle">Product Categories:</p>
            <div
              v-for="application in document.data.overview_applications"
              :key="application.id"
            >
              <prismic-link :field="application.application">{{
                parseNameFromUid(application.application.uid)
              }}</prismic-link>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { Route } from 'vue-router/types'
import { find } from 'lodash'
import moment from 'moment'
import { IPrismic, IPrismicDocument } from '~/shims'
import parseNameFromUid from '~/services/uidToPageName.ts'

@Component({})
export default class Overview extends Vue {
  document: IPrismicDocument | null = null

  parseNameFromUid = parseNameFromUid

  formatDateString(dateString: string) {
    return moment(dateString).format('MMMM Do YYYY')
  }

  // fetch project from store and copy to component
  created() {
    const uid = this.$route.params.uid
    this.document = find(this.$store.state.projects.projects, { uid })
  }
}
</script>
