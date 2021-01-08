<template>
  <div id="search-bar" class="white py-2">
    <ais-instant-search
      :search-client="searchClient"
      :index-name="algoliaIndex"
    >
      <!-- search input -->
      <ais-search-box id="search-input">
        <div slot-scope="{ isSearchStalled, refine }">
          <v-text-field
            id="searchInput"
            ref="searchInput"
            v-model="searchQuery"
            height="80"
            placeholder="Search"
            light
            solo
            flat
            hide-details
            :class="{
              'pl-4': true,
              'pr-13': true,
              'py-2': true,
              'slide-in': true,
              in: searchBar.open && !searchBar.isClosing
            }"
            @input="refine(searchQuery)"
          />
          <span :hidden="!isSearchStalled">Loading...</span>
        </div>
      </ais-search-box>
      <!-- search results -->
      <ais-hits id="search-results" v-if="searchQuery">
        <div slot-scope="{ items }">
          <!-- results -->
          <v-list dark v-if="items.length > 0" three-line>
            <v-list-item
              v-for="item in items"
              :key="item.objectID"
              :href="linkResolver(item.documentLink)"
              data-nuxt-link
              @click.native="clearSearch()"
            >
              <v-list-item-avatar size="60" tile class="rounded">
                <v-img :src="item.image" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <ais-highlight :hit="item" attribute="title"></ais-highlight>
                </v-list-item-title>
                <v-list-item-subtitle>
                  in&nbsp;<ais-highlight
                    :hit="item"
                    attribute="type"
                  ></ais-highlight>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- no results -->
          <v-list v-else dark>
            <v-list-item>
              <v-list-item-title>No Results</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </ais-hits>
    </ais-instant-search>
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
  #search-input {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: #ffffff;
  }
}
#search-results {
  position: absolute;
  top: 96px;
  width: 100%;
  left: 0px;
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
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import algoliasearch from 'algoliasearch/lite'
import linkResolver from '~/plugins/link-resolver'
@Component({
  computed: {
    ...mapState('layout', ['searchBar'])
  }
})
export default class SearchBar extends Vue {
  searchQuery = ''
  searchClient = algoliasearch(
    process.env.algoliaAppId!,
    process.env.algoliaApiKey!
  )
  algoliaIndex = 'PAGES'
  linkResolver = linkResolver
  clearSearch() {
    this.$store.commit('layout/setSearchBar', { open: false, isClosing: false })
    this.searchQuery = ''
  }
}
</script>
