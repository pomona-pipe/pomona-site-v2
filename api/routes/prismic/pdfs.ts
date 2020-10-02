/* eslint-disable camelcase */
import { Router } from 'express'
import { getServerUrl } from '../../tools'
import { createPrismicResults } from '../../functions/prismic'
import { updateS3FromDropbox } from '../../functions'

// create route and export to api
const router = Router()
router.use('/prismic/pdfs', async (req, res) => {
  const fileTypes: FileType[] = ['PDF']
  const page = Number(req.query.page)
  const serverUrl = getServerUrl(req)
  const results = await createPrismicResults(
    fileTypes,
    serverUrl,
    page
  )
  res.send(results)
  // TODO: replace with dropbox webhook
  res.on('finish', () => {
    updateS3FromDropbox()
  })
})
export default router
