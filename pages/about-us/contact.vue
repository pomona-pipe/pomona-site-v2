<template>
  <div id="contact-page" class="page">
    <!-- Hero Banner -->
    <v-row>
      <v-col class="px-0 py-0">
        <v-img
          :src="contact[0].data.main_image.url"
          gradient="to top right, rgba(36, 36, 36, 0.9), rgba(25,32,72,.7)"
          max-height="250px"
          class="white--text"
        >
          <v-row align="center" class="fill-height">
            <v-col align="center">
              <div class="grey--text text--lighten-2">
                <prismic-rich-text :field="contact[0].data.main_title" />
              </div>
            </v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>
    <!-- Contact Form -->
    <v-row>
      <v-col>
        <h2 class="text-center">Contact Form Goes Here</h2>
      </v-col>
    </v-row>
    <ContactForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import { IPrismic } from '~/shims'
import ContactForm from '~/components/Forms/ContactForm.vue'

@Component({
  components: { ContactForm },
  computed: mapState('pages', ['contact'])
})
export default class Index extends Vue {
  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    await store.dispatch('pages/getContact', $prismic)
  }
}
</script>
