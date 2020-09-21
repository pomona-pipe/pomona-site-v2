/* eslint-disable camelcase */
import { Router } from 'express'
import { createFileResults } from '../../functions/dropbox'

// create route and export to api
const router = Router()
router.use('/dropbox/images', async (req, res) => {
  const dropboxPath = '/2020 Website'
  const fileTypes: FileType[] = ['Image']
  const page = Number(req.query.page) || 1
  const show = 50
  const serverUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${req.hostname}`
  const response = await createFileResults(
    dropboxPath,
    fileTypes,
    page,
    show,
    serverUrl
  ).catch((error) => {
    return JSON.stringify(error)
  })
  res.send(response)
})
export default router
