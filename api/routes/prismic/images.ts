/* eslint-disable camelcase */
import { Router } from 'express'
import { getServerUrl } from '../../tools'
import { createPrismicResults } from '../../functions/prismic'

// create route and export to api
const router = Router()
router.use('/prismic/images', async (req, res) => {
  const fileTypes: FileType[] = ['Image']
  const page = Number(req.query.page)
  const serverUrl = getServerUrl(req)
  const results = await createPrismicResults(
    fileTypes,
    serverUrl,
    page
  )
  res.send(results)
})
export default router
