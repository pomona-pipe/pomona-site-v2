/* eslint-disable camelcase */
import { Router } from 'express'
import { getServerUrl } from '../../tools'
import { createFileResults } from '../../functions/dropbox'
import { updateS3FromDropbox } from '../../functions'

// create route and export to api
const router = Router()
router.use('/dropbox/docs', async (req, res) => {
  const fileTypes: FileType[] = ['PDF', 'Word Document']
  const page = Number(req.query.page) || 1
  const serverUrl = getServerUrl(req)
  const results = await createFileResults(
    fileTypes,
    page,
    serverUrl
  )
  const { prismic, filePaths } = results
  res.send(prismic)
  res.on('finish', () => {
    updateS3FromDropbox(filePaths)
  })
})
export default router
