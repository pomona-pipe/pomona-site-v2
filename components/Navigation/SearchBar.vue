<template>
  <div id="search-bar" class="white px-4 py-2">
    <!-- vuetify autocomplete component -->
    <v-text-field
      id="searchInput"
      v-model="searchInput"
      name="searchInput"
      height="80"
      placeholder="Search"
      light
      solo
      flat
      autofocus
      class="px-12"
    ></v-text-field>
    <v-btn @click="isSearchOpen = false" id="close-search" icon><v-icon color="black">{{ mdiClose }}</v-icon></v-btn>
  </div>
</template>

<style scoped lang="scss">
  #search-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 96px;
  }
  #close-search {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    &:hover {
      background-color: #f6f6f6;
    }
  }
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import { mdiClose } from '@mdi/js'

@Component({
  computed: {
    ...mapState('layout', ['isSearchOpen']),
    isSearchOpen: {
      get() {
        return this.$store.state.layout.isSearchOpen
      },
      set(value) {
        this.$store.commit('layout/setIsSearchOpen', value)
      }
    }
  }
})
export default class SearchBar extends Vue {
  mdiClose = mdiClose
  searchInput = ''
}
</script>
