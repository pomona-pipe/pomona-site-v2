<template>
  <section>
    <!-- Customer Reach Section -->
    <v-container>
      <v-row>
        <v-col>
          <v-img
            :src="home[0].data.customer_reach_map.url"
            max-height="800px"
          ></v-img>
        </v-col>
        <v-col>
          <prismic-rich-text
            :field="home[0].data.customer_reach_title"
            class="text-center"
          />
          <p class="text-center text-lg-left">
            {{ home[0].data.customer_reach_subtitle }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'

@Component({
  components: {},
  computed: {
    ...mapState('pages', ['home'])
  }
})
export default class CustomerReach extends Vue {}
</script>
