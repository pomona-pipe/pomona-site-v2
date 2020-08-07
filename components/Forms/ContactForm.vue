<template>
  <v-form
    :name="formName"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    @submit.prevent="handleSubmit"
  >
    <input type="hidden" name="form-name" :value="formName" />
    <v-row cols="12">
      <v-col sm="6" md="4">
        <v-text-field
          v-model="fields.firstName"
          :error-messages="firstNameErrors"
          :maxlength="20"
          :counter="20"
          label="First Name"
          required
          @input="$v.fields.firstName.$touch()"
          @blur="$v.fields.firstName.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn type="submit">Submit</v-btn>
  </v-form>
</template>
<style lang="css" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, numeric, email } from 'vuelidate/lib/validators'

interface ContactFields {
  firstName: string
  lastName: string
  company: string
  zip: string
  phone: string
  subject: string
  message: string
}

// types the form data being encoded for submmission
interface FormData extends ContactFields {
  'form-name': string
}

@Component({
  mixins: [validationMixin],
  // validations structure must match component data
  validations: {
    fields: {
      firstName: { required }
      // lastName: { required },
      // email: { required, email },
      // company: { required },
      // zip: { required, numeric },
      // phone: { required, numeric },
      // subject: { required },
      // message: { required }
    }
  },
  computed: {
    firstNameErrors() {
      const errors: string[] = []
      // do not error on initial load state
      if (!this.$v.fields.firstName!.$dirty) return errors
      // required check
      if (!this.$v.fields.firstName!.required)
        errors.push('First Name is required.')
      return errors
    }
  }
})
export default class ContactForm extends Vue {
  formName = 'test'

  fields: ContactFields = {
    firstName: '',
    lastName: '',
    company: '',
    zip: '',
    phone: '',
    subject: '',
    message: ''
  }

  checkError() {
    const keys = Object.keys(this.$v)
    keys.find((key) => {
      if (!key.startsWith('$') && this.$v[key].$error) {
        // eslint-disable-next-line no-console
        console.error('Error on property', key)
      }
    })
  }

  encode(data: FormData) {
    return Object.keys(data)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            data[key as keyof FormData]
          )}`
      )
      .join('&')
  }

  handleSubmit() {
    console.log(this.$v)
    console.log(this.fields)
    this.$v.$touch()
    if (this.$v.$error) {
      this.checkError()
      return
    }
    console.log('Form is valid')
    const axiosConfig = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
    axios
      .post(
        '/',
        this.encode({
          'form-name': this.formName,
          ...this.fields
        }),
        axiosConfig
      )
      .then(() => console.log('Form submitted!'))
      .catch((error) => console.error(error))
  }
}
</script>
