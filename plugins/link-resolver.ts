/**
 * TODO: update this file whenever creating a new document type in Prismic
 * Handles links to internal documents added inside Prismic Rich Text Field
 */

import { Document } from 'prismic-javascript/d.ts/documents'

interface IPrismicDocument extends Document {
  isBroken?: boolean
}

function parseUidFromName(uid: string) {
  const words = uid.split(' ')
  const conversions: { [key: string]: string } = {
    '&': 'and'
  }
  words.forEach((word, index) => {
    // convert first letter to lowercase
    words[index] = word.charAt(0).toLowerCase() + word.substr(1)
    // convert symbols to words
    if (Object.keys(conversions).includes(word)) {
      words[index] = conversions[word]
    }
  })
  return words.join('-')
}

export default function(doc: IPrismicDocument) {
  if (doc.isBroken) {
    return '/not-found'
  }

  const { uid, data } = doc

  switch (doc.type) {
    case 'product_categories':
      return `/products/${uid}`

    case 'products':
      return `/products/${parseUidFromName(data.product_category)}/${uid}`

    case 'projects':
      return `/projects/${uid}`

    case 'contact_page':
    case 'team_page':
      return `/about-us/${uid}`

    default:
      return `/${uid}`
  }
}
