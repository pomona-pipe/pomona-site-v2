/* eslint-disable camelcase */
import { Router } from 'express'
import nodemailer from 'nodemailer'
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
      htmlString += `<p><strong>${camelCaseToTitle(key)}:</strong>&nbsp;<span>${value}</span></p>`
    })
    return htmlString
  })()
  // create nodemailer transport instance
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'contact.pomonapp@gmail.com',
      pass: process.env.EMAIL_CONTACT_FORM_PASSWORD
    }
  })
  // compose email
  const mailOptions = {
    from: 'contact.pomonapp@gmail.com',
    to: formData.email,
    subject: `Pomona Contact Form - ${formData.subject}`,
    html: formHtml
  }
  // send message
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) res.send(err)
    else res.send(info)
  })
})

export default router
