/* eslint-disable camelcase */
import { Router } from 'express'
import { getServerUrl } from '../../tools'
import { createPrismicResults } from '../../functions/prismic'

// create route and export to api
const router = Router()
router.use('/prismic/pdfs', async (req, res) => {
  const fileType: S3UploadFolder = 'pdfs'
  const page = Number(req.query.page)
  const serverUrl = getServerUrl(req)
  const results = await createPrismicResults(
    fileType,
    serverUrl,
    page
  )
  res.send(results)
})
export default router
