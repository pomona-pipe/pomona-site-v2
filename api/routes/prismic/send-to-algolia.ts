/* eslint-disable camelcase */
import { Router } from 'express'
import Prismic from 'prismic-javascript'
import algoliaSearch from 'algoliasearch'
import { get } from 'lodash'
import { Document } from 'prismic-javascript/d.ts/documents'
import { getPrismicDocuments } from '../../functions/prismic'
import { snakeCaseToTitle } from '../../tools'

// create route and export to api
const router = Router()
router.use('/prismic/send-to-algolia', async (req, res) => {
  // fetch prismic documents
  // TODO: add prismic api token and options arg
  const prismicClient = await Prismic.getApi(
    'https://pomona.cdn.prismic.io/api/v2'
  )
  const predicates = [
    Prismic.Predicates.not('document.type', 'main_navigation'),
    Prismic.Predicates.not('document.type', 'footer_navigation'),
    Prismic.Predicates.not('document.type', 'employees')
  ]
  const results = await getPrismicDocuments(prismicClient, predicates)

  // structure for prismic results for algolia
  const algoliaReadyResults = results.map((document: Document) => {
    const {
      data,
      tags,
      type,
      uid,
      first_publication_date,
      last_publication_date,
      id
    } = document
    // use lodash get to access deep properties
    const title = get(data, 'name[0].text')
    const image = get(data, 'hero_image.thumbnail')
    const documentLink = {
      id,
      isBroken: false,
      lang: '',
      link_type: '',
      slug: '',
      tags,
      type,
      uid
    }
    return {
      title,
      image,
      type: snakeCaseToTitle(type),
      tags,
      documentLink,
      publication_date: first_publication_date,
      modified: last_publication_date,
      objectID: id
    }
  })

  // create algolia client
  const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY } = process.env
  const algoliaClient = algoliaSearch(ALGOLIA_APP_ID!, ALGOLIA_ADMIN_KEY!)

  // create algolia search index
  const algoliaIndex = algoliaClient.initIndex('PAGES')

  // send to algolia
  const algoliaObjectIds = await algoliaIndex.saveObjects(algoliaReadyResults)
  res.send(algoliaObjectIds)
})
export default router
