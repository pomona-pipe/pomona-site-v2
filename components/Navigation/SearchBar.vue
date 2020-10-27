<template>
  <div id="search-bar" class="white py-2">
    <!-- vuetify autocomplete component -->
    <v-text-field
      ref="searchInput"
      id="searchInput"
      v-model="searchInput"
      height="80"
      placeholder="Search"
      light
      solo
      flat
      hide-details
      :class="{
        'pl-4': true,
        'pr-13': true,
        'slide-in': true,
        in: searchBar.open && !searchBar.isClosing
      }"
    ></v-text-field>
    <!-- search results -->
    <v-data-table
      v-show="searchInput"
      :headers="searchHeaders"
      :items="searchResults"
      :loading="isLoading"
      loading-text="Loading... Please wait"
      hide-default-header
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item="props">
        <tr>
          <td class="pa-4">
            <nuxt-link
              :to="props.item.route"
              class="text-decoration-none"
              @click.native="clearSearch()"
            >
              <div class="d-flex">
                <v-img
                  :src="props.item.thumbnail"
                  :alt="props.item.title"
                  width="80px"
                  height="80px"
                  class="flex-grow-0 mr-4"
                ></v-img>
                <div>
                  <div class="text-h6 white--text">{{ props.item.title }}</div>
                  <div class="text-subtitle-1 grey--text text--lighten-1">
                    {{ props.item.type }}
                  </div>
                </div>
              </div>
            </nuxt-link>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped lang="scss">
#search-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 96px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 100ms cubic-bezier(0.4, 0, 0.2, 1);
  &.is-open,
  &.is-closing {
    visibility: visible;
    opacity: 1;
  }
}
.slide-in {
  ::v-deep #searchInput {
    transform: translateY(16px);
    transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  &.in {
    ::v-deep #searchInput {
      transform: translateY(0px);
      pointer-events: all;
    }
  }
}
</style>

<script lang="ts">
import { SearchString } from 'aws-sdk/clients/route53'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import { debounce } from 'lodash'
import { IPrismic } from '~/shims'
import linkResolver from '~/plugins/link-resolver'

@Component({
  computed: {
    ...mapState('layout', ['searchBar'])
  }
})
export default class SearchBar extends Vue {
  searchInput = ''
  searchHeaders = [
    {
      text: 'Thumbnail',
      align: 'start',
      sortable: false,
      value: 'thumbnail'
    },
    {
      text: 'Title',
      value: 'title'
    },
    { text: 'Type', value: 'type' }
  ]
  searchResults = []
  isLoading = false
  pendingTimeOut: NodeJS.Timeout | null = null

  @Watch('searchInput',{deep: true})
  async onSearchInputChange(query: string) {
    // set loading to true
    this.isLoading = true
    if (this.pendingTimeOut) {
      clearTimeout(this.pendingTimeOut)
    }
    this.pendingTimeOut = setTimeout(() => {
      return new Promise(async (resolve) => {
        await this.getPrismicSearchResults(query)
        // set loading back to false
        this.isLoading = false
        resolve()
      })
    }, 3000)
  }

  clearSearch() {
    this.$store.commit('layout/setSearchBar', { open: false, isClosing: false })
    this.searchInput = ''
    console.log('search cleared')
  }

  async getPrismicSearchResults(query: string) {
    const byFullText = (this as any).$prismic.predicates.fulltext(
      'document',
      query
    )
    const prismicSearchResults = await (this as any).$prismic.api.query(
      byFullText,
      {}
    )
    this.searchResults = prismicSearchResults.results.map((result: any) => {
      const thumbnail = result.data.hero_image.thumbnail
      const title = result.data.name[0].text
      const type = result.type
      const documentLink = {
        id: result.id,
        isBroken: false,
        lang: '',
        link_type: '',
        slug: result.slugs[0],
        tags: result.tags,
        type: result.type,
        uid: result.uid
      }
      const route = linkResolver(documentLink)
      return {
        thumbnail,
        title,
        type,
        route
      }
    })
  }

}
</script>
