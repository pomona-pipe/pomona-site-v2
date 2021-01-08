/* eslint-disable camelcase */
import { Router } from 'express'
import { SES, config } from 'aws-sdk'
import { camelCaseToTitle } from '../../tools'

// create route and export to api
const router = Router()
router.use('/forms/send-email', async (req, res) => {
  // copy request body to new variable for readability
  const formData = Object.assign({}, req.body)
  // construct html for email
  const formHtml = (() => {
    let htmlString = ''
    Object.entries(formData).forEach((entry) => {
      const [key, value] = entry
      htmlString += `<p><strong>${camelCaseToTitle(
        key
      )}:</strong>&nbsp;<span>${value}</span></p>`
    })
    return htmlString
  })()
  // node env vars
  const {
    CONTACT_FORM_SENDER_EMAIL,
    CONTACT_FORM_EMAIL_RECEPIENTS
  } = process.env
  // configure AWS
  config.update({ region: 'us-east-1' })
  // create sendEmail params
  const params = {
    Destination: {
      ToAddresses: CONTACT_FORM_EMAIL_RECEPIENTS!.split(/,\s*/)
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: formHtml!
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `[Form Submission] ${formData.subject}`
      }
    },
    Source: CONTACT_FORM_SENDER_EMAIL!,
    ReplyToAddresses: [
      formData.email!
    ]
  }
  // create SES service object
  const ses = new SES()
  // send message with params
  ses.sendEmail(params).promise()
    .then((data) => res.send(data))
    .catch((err) => res.send(err))
})

export default router
