<template>
  <section>
    <!-- Supplier Logos Section -->
    <v-container>
      <prismic-rich-text
        class="text-center"
        :field="home[0].data.supplier_logo_title"
      />
      <div class="px-5">
        <v-row class="justify-center align-center mt-12 mx-n8">
          <v-col
            v-for="logo in home[0].data.supplier_logos"
            :key="logo.id"
            class="pb-16 px-8 flex-grow-0"
          >
            <v-img
              :src="logo.image.fileUrl"
              max-height="200px"
              max-width="150px"
            ></v-img>
          </v-col>
        </v-row>
      </div>
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
export default class SupplierLogo extends Vue {}
</script>
