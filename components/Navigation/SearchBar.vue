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
      hide-default-header
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item="props">
        <tr>
          <td class="pa-4">
            <nuxt-link :to="props.item.route" class="text-decoration-none" @click.native="clearSearch()">
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
                  <div class="text-subtitle-1 grey--text text--lighten-1">{{ props.item.type }}</div>
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
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'

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
  get searchResults() {
    return [
      {
        thumbnail:
          'https://d113q3lewv5kc2.cloudfront.net/images/Slipline_Aluminum_riser.jpg@80w_80h',
        title: 'Sliplining',
        type: 'Application',
        route: '/applications/slip-lining'
      },
      {
        thumbnail:
          'https://d113q3lewv5kc2.cloudfront.net/images/Angier_Road_-_Fuquay_Varina_-_num6-L2_Aluminum_Box_Culvert_Inlet_View.jpg@80w_80h',
        title: 'Angier Road',
        type: 'Project',
        route: '/projects/angier-road'
      },
      {
        thumbnail:
          'https://d113q3lewv5kc2.cloudfront.net/images/Ambrosio_Brothers_Rumford.jpg@80w_80h',
        title: 'Rumford Fireplace',
        type: 'Product',
        route: '/products/crafted-clay/rumford-fireplaces'
      }
    ]
  }
  clearSearch() {
    this.$store.commit('layout/setSearchBar', { open: false, isClosing: false })
    this.searchInput = ''
    console.log('search cleared')
  }
}
</script>
