/* eslint-disable camelcase */
import { Router } from 'express'
import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import fetch from 'isomorphic-fetch'

// create route and export to api
const router = Router()
router.use('/dropbox', async (req, res) => {
  const serverUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${req.hostname}`
  const page = Number(req.query.page) || 1
  const show = 50
  const response = await getDropboxFiles(serverUrl, page, show).catch(
    (error) => {
      return JSON.stringify(error)
    }
  )
  res.send(response)
})
export default router

async function getDropboxFiles(serverUrl: string, page: number, show: number) {
  // create dropbox instance
  const {
    DROPBOX_APP_KEY,
    DROPBOX_APP_SECRET,
    DROPBOX_ACCESS_TOKEN
  } = process.env // NOTE: must pass these node env vars
  const options: DropboxTypes.DropboxOptions = {
    fetch,
    accessToken: DROPBOX_ACCESS_TOKEN,
    clientId: DROPBOX_APP_KEY
  }
  const dropbox = new Dropbox(options)
  dropbox.setClientSecret(DROPBOX_APP_SECRET!)

  // structure ListFolder Arg
  const listFolderArg: DropboxTypes.files.ListFolderArg = {
    path: '/2020 Website',
    recursive: true,
    include_media_info: false,
    include_deleted: false,
    include_has_explicit_shared_members: false,
    include_mounted_folders: false,
    include_non_downloadable_files: false
  }

  // retrieve initial results
  const listFolderResult = await dropbox.filesListFolder(listFolderArg)
  const entries = listFolderResult.entries as DropboxTypes.files.FileMetadataReference[]
  const { cursor, has_more } = listFolderResult
  // retrieve remaining results
  if (has_more) {
    const remainingListFolderResult = await dropbox.filesListFolderContinue({
      cursor
    })
    const remainingEntries = remainingListFolderResult.entries as DropboxTypes.files.FileMetadataReference[]
    entries.push(...remainingEntries)
  }
  // filter just files
  const fileResults = entries.filter((entry) => entry['.tag'] === 'file')
  // return current page
  const start = page * show - show
  const end = start + show
  const pageResults = fileResults.slice(start, end)

  // structure final results
  const results: IPrismicResult[] = []
  for (const file of pageResults) {
    const { id, name, client_modified, path_lower } = file
    const docInfo = getDocInfo(name, serverUrl)
    const { description, thumbnail, mimetype } = docInfo

    // obtain file url from shared link
    let fileUrl: string
    // try to create shared link
    try {
      const createLinkArg: DropboxTypes.sharing.CreateSharedLinkWithSettingsArg = {
        path: path_lower!
      }
      fileUrl = (
        await dropbox.sharingCreateSharedLinkWithSettings(createLinkArg)
      ).url
    } catch (error) {
      // else retrieve shared link
      const listLinkArg: DropboxTypes.sharing.ListSharedLinksArg = {
        path: path_lower,
        direct_only: true
      }
      fileUrl = (await dropbox.sharingListSharedLinks(listLinkArg)).links[0].url
    }
    // push each result
    results.push({
      id,
      title: name,
      description,
      image_url: thumbnail,
      last_update: Number(new Date(client_modified)),
      blob: { fileUrl, mimetype }
    })
  }
  // send response
  const response: IPrismicResponse = {
    results_size: results.length,
    results
  }
  return response
}

function getDocInfo(fileName: string, serverUrl: string) {
  const suffix = fileName
    .split('.')
    .slice(-1)[0]
    .toLowerCase()
  switch (suffix) {
    case 'png':
      return {
        description: 'Image',
        thumbnail: `${serverUrl}/images/placeholders/file-image.svg`,
        mimetype: 'image/png'
      }
    case 'jpg':
    case 'jpeg':
      return {
        description: 'Image',
        thumbnail: `${serverUrl}/images/placeholders/file-image.svg`,
        mimetype: 'image/jpeg'
      }
    case 'pdf':
      return {
        description: 'PDF Document',
        thumbnail: `${serverUrl}/icons/file-pdf.svg`,
        mimetype: 'application/pdf'
      }
    case 'doc':
      return {
        description: 'Word Document',
        thumbnail: `${serverUrl}/icons/file-word.svg`,
        mimetype: 'application/msword'
      }
    case 'docx':
      return {
        description: 'Word Document',
        thumbnail: `${serverUrl}/icons/file-word.svg`,
        mimetype:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }
    case 'xls':
      return {
        description: 'Spreadsheet',
        thumbnail: `${serverUrl}/icons/file-excel.svg`,
        mimetype: 'application/vnd.ms-excel'
      }
    case 'xlsx':
      return {
        description: 'Spreadsheet',
        thumbnail: `static/icons/file-excel.svg`,
        mimetype:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    case 'csv':
      return {
        description: 'CSV',
        thumbnail: `${serverUrl}/icons/file-excel.svg`,
        mimetype: 'text/csv'
      }
    case 'ppt':
      return {
        description: 'PowerPoint',
        thumbnail: `${serverUrl}/icons/file-powerpoint.svg`,
        mimetype: 'application/vnd.ms-powerpoint'
      }
    case 'pptx':
      return {
        description: 'PowerPoint',
        thumbnail: `static/icons/file-powerpoint.svg`,
        mimetype:
          'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      }
    default:
      return {
        description: 'Dropbox File',
        thumbnail: `${serverUrl}/images/file-image.svg`,
        mimetype: 'text'
      }
  }
}
