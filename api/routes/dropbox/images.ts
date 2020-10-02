/* eslint-disable camelcase */
import { Router } from 'express'
import { getServerUrl } from '../../tools'
import { createPrismicResults } from '../../functions/prismic'
import { updateS3FromDropbox } from '../../functions'

// create route and export to api
const router = Router()
router.use('/dropbox/images', async (req, res) => {
  const fileTypes: FileType[] = ['Image']
  const page = Number(req.query.page) || 1
  const serverUrl = getServerUrl(req)
  const results = await createPrismicResults(
    fileTypes,
    page,
    serverUrl
  )
  res.send(results)
  // TODO: replace with dropbox webhook
  res.on('finish', () => {
    updateS3FromDropbox()
  })
})
export default router
