/* eslint-disable camelcase */
import Prismic from 'prismic-javascript'
import { Document } from 'prismic-javascript/d.ts/documents'

export default async function() {
  const api = await Prismic.getApi('https://pomona.cdn.prismic.io/api/v2')
  const dynamicRoutes: string[] = []
  const contentTypes = [
    'product_categories',
    'products',
    'projects',
    'applications'
  ]

  // query routes for each content type
  for (const type of contentTypes) {
    const byType = Prismic.Predicates.at('document.type', type)
    const query = await api.query(byType, {})
    // push routes from first page of results
    const firstPageRoutes = query.results.map((result) =>
      getRouteFromResult(result)
    )
    dynamicRoutes.push(...firstPageRoutes)
    // push routes from subsequent pages if necessary
    let { page, next_page } = query
    while (next_page) {
      const nextQuery = await api.query(byType, { page: page++ })
      const nextPageRoutes = nextQuery.results.map((result) =>
        getRouteFromResult(result)
      )
      dynamicRoutes.push(...nextPageRoutes)
      next_page = nextQuery.next_page
    }
  }
  return dynamicRoutes
}

function getRouteFromResult(result: Document) {
  const { type, uid } = result
  switch (type) {
    case 'product_categories':
      return `/products/${uid}`
    case 'products':
      return `/products/${result.data.product_category.uid}/${uid}`
    case 'projects':
      return `/projects/${uid}`
    case 'applications':
      return `/applications/${uid}`
    default:
      return ''
  }
}
