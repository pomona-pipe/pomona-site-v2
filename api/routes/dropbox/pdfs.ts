/* eslint-disable camelcase */
import { Router } from 'express'
import { createFileResults, downloadDropboxFiles } from '../../functions/dropbox'

// create route and export to api
const router = Router()
router.use('/dropbox/pdfs', async (req, res) => {
  const dropboxPath = '/2020 Website'
  const fileTypes: FileType[] = ['PDF']
  const page = Number(req.query.page) || 1
  const show = 50
  const serverUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${req.hostname}`
  const results = await createFileResults(
    dropboxPath,
    fileTypes,
    page,
    show,
    serverUrl
  )
  const { prismic, filePaths } = results 
  res.send(prismic)
  res.on('finish', () => {
    downloadDropboxFiles(filePaths)
  })
})
export default router
