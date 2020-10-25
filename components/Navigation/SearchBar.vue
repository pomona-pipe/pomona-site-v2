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
      :class="{'pl-4': true, 'pr-13': true, 'slide-in': true, 'in': searchBar.open  && !searchBar.isClosing}"
    ></v-text-field>
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
    &.is-open, &.is-closing {
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
}
</script>
