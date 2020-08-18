/**
 * TODO: update this file whenever creating a new document type in Prismic
 * Handles links to internal documents added inside Prismic Rich Text Field
 */

import { Document } from 'prismic-javascript/d.ts/documents'

// from https://prismic.io/docs/javascript/beyond-the-api/link-resolving
interface DocumentLink {
  id: string
  isBroken: boolean
  lang: string
  // eslint-disable-next-line camelcase
  link_type: string
  slug: string
  tags: string[]
  type: string
  uid: string
}

export default function(doc: DocumentLink) {
  if (doc.isBroken) {
    return '/not-found'
  }

  const { uid } = doc

  switch (doc.type) {
    case 'category_page':
      return '/products'

    case 'product_categories':
      return `/products/${uid}`

    case 'products':
      if (process.client) {
        // overwrite initial href value once product category is retrieved
        ;(window.$nuxt as any).$prismic.api
          .getByUID('products', uid)
          .then((result: Document) => {
            const productLink = `/products/${
              result!.data.product_category.uid
            }/${uid}`
            const productAnchorTags = document.querySelectorAll(
              'a[href*="product_category"]'
            )
            productAnchorTags.forEach((el, key) => {
              if (el.getAttribute('href')!.includes(uid)) {
                productAnchorTags[key].setAttribute('href', productLink)
              }
            })
          })
          .catch(() => '/not-found')
      }
      // initial href value - overwritten after api call
      return `/products/product_category/${uid}`

    case 'projects_page':
      return '/projects'

    case 'projects':
      return `/projects/${uid}`

    case 'about_us_page':
      return '/about-us'

    case 'contact_page':
      return '/about-us/contact'

    case 'team_page':
      return '/about-us/team'

    default:
      return '/not-found'
  }
}
