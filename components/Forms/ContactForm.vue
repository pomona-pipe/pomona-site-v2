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
      <!-- Name Section -->
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
      <v-col sm="6" md="4">
        <v-text-field
          v-model="fields.lastName"
          :error-messages="lastNameErrors"
          :maxlength="20"
          :counter="20"
          label="Last Name"
          required
          @input="$v.fields.lastName.$touch()"
          @blur="$v.fields.lastName.$touch()"
        ></v-text-field>
      </v-col>
      <!-- email & company section -->
      <v-col sm="6" md="4">
        <v-text-field
          v-model="fields.email"
          :error-messages="emailErrors"
          label="E-mail"
          email
          required
          @input="$v.fields.email.$touch()"
          @blur="$v.fields.email.$touch()"
        ></v-text-field>
      </v-col>
      <v-col sm="6" md="4">
        <v-text-field
          v-model="fields.company"
          :error-messages="companyErrors"
          label="Company Name"
          required
          @input="$v.fields.company.$touch()"
          @blur="$v.fields.company.$touch()"
        ></v-text-field>
      </v-col>
      <!-- phone # and Zip Code Section -->
      <!-- Subject and Message Section  -->
      <v-col sm="12" md="12">
        <v-text-field
          v-model="fields.subject"
          :error-messages="subjectErrors"
          :maxlength="50"
          :counter="50"
          label="Subject"
          required
          @input="$v.fields.subject.$touch()"
          @blur="$v.fields.subject.$touch()"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="12">
        <v-textarea
          rows="2"
          auto-grow
          v-model="fields.message"
          :error-messages="messageErrors"
          :maxlength="750"
          :counter="750"
          label="Message"
          required
          @input="$v.fields.message.$touch()"
          @blur="$v.fields.message.$touch()"
        ></v-textarea>
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
// import { InputFacade, facade, filter } from 'vue-input-facade'

interface ContactFields {
  firstName: string
  lastName: string
  email: string
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
      firstName: { required },
      lastName: { required },
      email: { required, email },
      company: { required },
      // zip: { required, numeric },
      // phone: { required, numeric },
      subject: { required },
      message: { required }
    }
  },
  computed: {
    firstNameErrors() {
      const errors: string[] = []
      // do not error on initial load state
      if (!this.$v.fields.firstName!.$dirty) return errors
      // required check
      if (!this.$v.fields.firstName!.required)
        errors.push('First Name is required')
      return errors
    },
    lastNameErrors() {
      const errors: string[] = []
      // do not error on initial load state
      if (!this.$v.fields.lastName!.$dirty) return errors
      // required check
      if (!this.$v.fields.lastName!.required)
        errors.push('Last Name is required')
      return errors
    },
    emailErrors() {
      const errors: string[] = []
      // do not error on initial load state
      if (!this.$v.fields.email!.$dirty) return errors
      // required check
      if (!this.$v.fields.email!.required) errors.push('E-mail is required')
      if (!this.$v.fields.email!.email) errors.push('Must be valid e-mail')
      return errors
    },
    companyErrors() {
      const errors: string[] = []
      // do not error on initial load state
      if (!this.$v.fields.company!.$dirty) return errors
      // required check
      if (!this.$v.fields.company!.required)
        errors.push('Company Name is required')
      return errors
    },
    subjectErrors() {
      const errors: string[] = []
      // do not error on initial load state
      if (!this.$v.fields.subject!.$dirty) return errors
      // required check
      if (!this.$v.fields.subject!.required) errors.push('Subject is required')
      return errors
    },
    messageErrors() {
      const errors: string[] = []
      // do not error on initial load state
      if (!this.$v.fields.message!.$dirty) return errors
      // required check
      if (!this.$v.fields.message!.required) errors.push('Message is required')
      return errors
    }
  }
})
export default class ContactForm extends Vue {
  formName = 'test'

  fields: ContactFields = {
    firstName: '',
    lastName: '',
    email: '',
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
