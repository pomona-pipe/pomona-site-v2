/* eslint-disable camelcase */
import { Router } from 'express'
import { createFileResults } from '../../functions/dropbox'

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
  const response = await createFileResults(
    dropboxPath,
    fileTypes,
    page,
    show,
    serverUrl
  ).catch((error) => {
    return JSON.stringify(error)
  })
  /* TODO: write pdf files to server on response finish
   ** res.on('finish', () => {...})
   ** Post-Response Steps:
   ** 1. make a files directory inside static folder if needed
   ** 2. filter response.results for non-image files (description !== 'Image')
   ** 3. filter again for either of these conditions:
   **   a) file does not already exist
   **   b) file already exists, but client_modified is after the server write time
   ** 4. Write new/updated non-image files to ~/files
   */
  res.send(response)
})
export default router
