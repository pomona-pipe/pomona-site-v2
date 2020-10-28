/* eslint-disable camelcase */
import { Router } from 'express'
import Prismic from 'prismic-javascript'
import algoliaSearch from 'algoliasearch'
import { get } from 'lodash'
import { IPrismicDocument } from '../../../shims'

// create route and export to api
const router = Router()
router.use('/prismic/send-to-algolia', async (req, res) => {
  // fetch prismic documents
  // FIXME: retrieve all documents (not just first page)
  // TODO: add prismic api token and options arg
  const prismicClient = await Prismic.getApi(
    'https://pomona.cdn.prismic.io/api/v2'
  )
  const { results } = await prismicClient.query(
    [
      Prismic.Predicates.not('document.type', 'main_navigation'),
      Prismic.Predicates.not('document.type', 'footer_navigation'),
      Prismic.Predicates.not('document.type', 'employees')
    ],
    {}
  )

  // structure for prismic results for algolia
  const algoliaReadyResults = results.map((document: IPrismicDocument) => {
    const {
      data,
      tags,
      uid,
      first_publication_date,
      last_publication_date,
      id
    } = document
    // use lodash get to access deep properties
    const title = get(data, 'name[0].text')
    const image = get(data, 'hero_image.thumbnail')
    return {
      title,
      image,
      tags,
      slug: uid,
      publication_date: first_publication_date,
      modified: last_publication_date,
      objectID: id
    }
  })

  // create algolia client
  const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY } = process.env
  const algoliaClient = algoliaSearch(ALGOLIA_APP_ID!, ALGOLIA_ADMIN_KEY!)

  // create algolia search index
  const algoliaIndex = algoliaClient.initIndex('POMONA_PAGES')

  // send to algolia
  const algoliaObjectIds = await algoliaIndex.saveObjects(algoliaReadyResults)
  res.send(algoliaObjectIds)
})
export default router
