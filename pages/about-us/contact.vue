<template>
  <div id="contact-page" class="page">
    <!-- Hero -->
    <section class="hero" :style="heroStyles">
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col align="center">
            <div class="grey--text text--lighten-2">
              <prismic-rich-text :field="contact[0].data.main_title" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- Contact Form -->
    <section>
      <v-container>
        <v-row>
          <v-col cols="12" md="10" offset-md="1" lg="8" offset-lg="2">
            <ContactForm />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Store, mapState } from 'vuex'
import pageVisits from '~/services/pageVisits'
import { IPrismic } from '~/shims'
import ContactForm from '~/components/Forms/ContactForm.vue'

@Component({
  components: { ContactForm },
  computed: {
    ...mapState('pages', ['contact']),
    heroStyles() {
      return {
        'background-image': `linear-gradient(to right top, rgba(36, 36, 36, 0.9), rgba(25, 32, 72, 0.7)), url("${
          (this as any).$store.state.pages.contact[0].data.hero_image.fileUrl
        }")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  }
})
export default class Index extends Vue {
  async fetch({ store, $prismic }: { store: Store<any>; $prismic: IPrismic }) {
    if (pageVisits() > 1) return
    await store.dispatch('pages/getContact', $prismic)
  }
}
</script>
