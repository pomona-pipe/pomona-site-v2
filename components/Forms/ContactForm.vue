<template>
  <v-form
    :name="formName"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    @submit.prevent="handleSubmit"
  >
    <input type="hidden" name="form-name" :value="formName" />
    <v-row>
      <!-- Name Section -->
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          id="firstName"
          v-model="fields.firstName"
          name="firstName"
          :error-messages="firstNameErrors"
          :maxlength="20"
          :counter="20"
          label="First Name"
          required
          @input="$v.fields.firstName.$touch()"
          @blur="$v.fields.firstName.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          id="lastName"
          v-model="fields.lastName"
          name="lastName"
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
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          id="email"
          v-model="fields.email"
          name="email"
          :error-messages="emailErrors"
          label="E-mail"
          email
          required
          @input="$v.fields.email.$touch()"
          @blur="$v.fields.email.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          id="company"
          v-model="fields.company"
          name="company"
          :error-messages="companyErrors"
          :maxlength="50"
          :counter="50"
          label="Company Name"
          required
          @input="$v.fields.company.$touch()"
          @blur="$v.fields.company.$touch()"
        ></v-text-field>
      </v-col>
      <!-- phone # and Zip Code Section -->
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          id="phone"
          v-model="fields.phone"
          name="phone"
          type="tel"
          v-mask="'(###) ### - ####'"
          :error-messages="phoneErrors"
          label="Phone Number"
          required
          @input="$v.fields.phone.$touch()"
          @blur="$v.fields.phone.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          id="zip"
          v-model="fields.zip"
          name="zip"
          inputmode="numeric"
          pattern="\d*"
          v-mask="'#####'"
          :error-messages="zipErrors"
          label="Zip Code"
          required
          @input="$v.fields.zip.$touch()"
          @blur="$v.fields.zip.$touch()"
        ></v-text-field>
      </v-col>
      <!-- Subject and Message Section  -->
      <v-col cols="12" sm="12" md="12">
        <v-text-field
          id="subject"
          v-model="fields.subject"
          name="subject"
          :error-messages="subjectErrors"
          :maxlength="50"
          :counter="50"
          label="Subject"
          required
          @input="$v.fields.subject.$touch()"
          @blur="$v.fields.subject.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-textarea
          id="message"
          v-model="fields.message"
          name="message"
          rows="2"
          auto-grow
          :error-messages="messageErrors"
          :maxlength="750"
          :counter="750"
          label="Message"
          required
          @input="$v.fields.message.$touch()"
          @blur="$v.fields.message.$touch()"
        ></v-textarea>
      </v-col>
      <v-col>
        <v-btn block large color="primary" type="submit">Submit</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<style lang="css" scoped></style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import {
  CustomRule,
  required,
  minLength,
  email
} from 'vuelidate/lib/validators'
import { mask } from '@titou10/v-mask'

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

const phone: CustomRule = (phone: string) => {
  const regex = new RegExp(
    /^[\\(]{0,1}([2-9]){1}\d{2}[\\)]{0,1}[ ]?([^0-1]){1}(\d){2}[ ]?[-]?[ ]?(\d){4}[ ]*((x){0,1}(\d){1,5}){0,1}$/
  )
  return regex.test(phone)
}

@Component({
  mixins: [validationMixin],
  directives: { mask },
  // validations structure must match component data
  validations: {
    fields: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      company: { required },
      zip: { required, minLength: minLength(5) },
      phone: { required, phone, minLength: minLength(10) },
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
      if (!this.$v.fields.email!.email) errors.push('Must be a valid e-mail')
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
    phoneErrors() {
      const errors: string[] = []
      // do not error on initial load state
      if (!this.$v.fields.phone!.$dirty) return errors
      // required check
      if (!this.$v.fields.phone!.required)
        errors.push('Phone Number is required')
      // valid US phone check
      if (!this.$v.fields.phone!.phone)
        errors.push('Must be a valid US phone number')
      return errors
    },
    zipErrors() {
      const errors: string[] = []
      // do not error on initial load state
      if (!this.$v.fields.zip!.$dirty) return errors
      // required check
      if (!this.$v.fields.zip!.required) errors.push('Zip Code is required')
      // min-length check
      if (!this.$v.fields.zip!.minLength)
        errors.push('Zip Code must be 5 digits')
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
    const keys = Object.keys(this.$v.fields)
    keys.find((key) => {
      if (!key.startsWith('$') && this.$v.fields[key]!.$error) {
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
    this.$v.$touch()
    if (this.$v.$error) {
      this.checkError()
      return
    }
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
      .then(() => {
        console.log('Form submitted!')
        // TODO: show a success toast/message and clear form
      })
      .catch((error) => {
        console.error(error)
        // TODO: show an error toast/message and clear form
      })
  }
}
</script>
