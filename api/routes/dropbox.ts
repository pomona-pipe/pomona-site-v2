/* eslint-disable camelcase */
import { Router } from 'express'
import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import fetch from 'isomorphic-fetch'

// create route and export to api
const router = Router()
router.use('/dropbox', async (req, res) => {
  const dropboxPath = '/2020 Website'
  const page = Number(req.query.page) || 1
  const show = 50
  const serverUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${req.hostname}`
  const response = await createFileResults(
    dropboxPath,
    page,
    show,
    serverUrl
  ).catch((error) => {
    return JSON.stringify(error)
  })
  res.send(response)
})
export default router

async function createFileResults(
  dropboxPath: string,
  page: number,
  show: number,
  serverUrl: string
) {
  // create dropbox instance
  const {
    DROPBOX_APP_KEY,
    DROPBOX_APP_SECRET,
    DROPBOX_ACCESS_TOKEN
  } = process.env
  const dropbox = createDropbox(
    DROPBOX_ACCESS_TOKEN!,
    DROPBOX_APP_KEY!,
    DROPBOX_APP_SECRET!
  )
  // build results
  const files = await getDropboxFilesByPage(dropboxPath, dropbox, page, show)
  const results: IPrismicResult[] = []
  for (const file of files) {
    const { id, name, client_modified, path_lower } = file
    const docInfo = getDocInfo(name, serverUrl)
    const { description, thumbnail, mimetype } = docInfo
    const fileUrl = await getDropboxSharedLink(path_lower!, dropbox)
    results.push({
      id,
      title: name,
      description,
      image_url: thumbnail,
      last_update: Number(new Date(client_modified)),
      blob: { fileUrl, mimetype }
    })
  }
  // structure response
  const response: IPrismicResponse = {
    results_size: results.length,
    results
  }
  return response
}

function createDropbox(
  accessToken: string,
  clientId: string,
  clientSecret: string
) {
  // create dropbox instance
  const options: DropboxTypes.DropboxOptions = {
    fetch,
    accessToken,
    clientId
  }
  const dropbox = new Dropbox(options)
  dropbox.setClientSecret(clientSecret)
  return dropbox
}

async function getDropboxFilesByPage(
  path: string,
  dropbox: Dropbox,
  page: number,
  show: number
) {
  // structure ListFolder Arg
  const listFolderArg: DropboxTypes.files.ListFolderArg = {
    path,
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
  // return correct page
  const start = page * show - show
  const end = start + show
  const pageResults = fileResults.slice(start, end)
  return pageResults
}

async function getDropboxSharedLink(path: string, dropbox: Dropbox) {
  // obtain file url from shared link
  let sharedLink: string
  // try to create shared link
  try {
    const createLinkArg: DropboxTypes.sharing.CreateSharedLinkWithSettingsArg = {
      path
    }
    sharedLink = (
      await dropbox.sharingCreateSharedLinkWithSettings(createLinkArg)
    ).url
  } catch (error) {
    // else get existing shared link
    const listLinkArg: DropboxTypes.sharing.ListSharedLinksArg = {
      path,
      direct_only: true
    }
    sharedLink = (await dropbox.sharingListSharedLinks(listLinkArg)).links[0]
      .url
  }
  return sharedLink
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
