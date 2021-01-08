/* eslint-disable camelcase */
import { Router } from 'express'
import axios from 'axios'
import { camelCaseToTitle } from '../../tools'

// create route and export to api
const router = Router()
router.use('/forms/slack-channel-post', async (req, res) => {
  // post to Slack Channel: contact-form
  const { formData, webhook } = req.body
  const data = (() => {
    let stringifiedForm = ''
    Object.entries(formData).forEach((entry, index, array) => {
      const [key, value] = entry
      // field name bolded with markdown
      const formattedFieldName = `*${camelCaseToTitle(key)}*`
      stringifiedForm += `${formattedFieldName}: ${value}`
      const lastIndex = array.length - 1
      if (index < lastIndex) stringifiedForm += '\n'
    })
    return { text: stringifiedForm }
  })()
  const post = await axios.post(process.env[webhook]!, JSON.stringify(data), {
    withCredentials: false,
    transformRequest: [
      (data, headers) => {
        delete headers.post['Content Type']
        return data
      }
    ]
  })
  res.send(post.statusText)
})

function formatFieldName(key: string) {
  // convert camelCase to separate words
  let friendlyName = key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ')
  // capitalize first letter of each word
  friendlyName = friendlyName.split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  // return bolded field name
  return `*${friendlyName}*`
}

export default router
