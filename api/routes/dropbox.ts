// TODO: add typing shim for dropbox FileMetaData interface
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import { resolve } from 'path'
import { Router } from 'express'
import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import fetch from 'isomorphic-fetch'

// create route
const router = Router()

// create response
router.use('/dropbox', async (req, res) => {
  const response = await getDropboxFiles().catch((error) => {
    return JSON.stringify(error)
  })
  res.send(response)
})

// export to api
export default router

async function getDropboxFiles() {
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

  // structure function arg
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
  const filtered = entries.filter((entry) => entry['.tag'] === 'file')
  // structure response
  const results: IPrismicResult[] = []
  for (const file of filtered) {
    const { id, name, client_modified, path_lower } = file
    const docType = getDocType(name)
    const { description, thumbnail, mimetype } = docType
    results.push({
      id,
      title: name,
      description,
      image_url: thumbnail,
      last_update: Number(new Date(client_modified)),
      blob: { downloadPath: path_lower, mimetype } as any
    })
  }
  const response: IPrismicResponse = {
    results_size: results.length,
    results
  }
  return response
}

function getDocType(fileName: string) {
  const suffix = fileName.split('.').slice(-1)[0]
  switch (suffix) {
    case 'png':
      return {
        description: 'Image',
        thumbnail: resolve('static/images/placeholders/file-pdf.svg'),
        mimetype: 'image/png'
      }
    case 'jpg':
    case 'jpeg':
      return {
        description: 'Image',
        thumbnail: resolve('static/images/placeholders/file-pdf.svg'),
        mimetype: 'image/jpeg'
      }
    case 'pdf':
      return {
        description: 'PDF Document',
        thumbnail: resolve('static/icons/file-pdf.svg'),
        mimetype: 'application/pdf'
      }
    case 'doc':
      return {
        description: 'Word Document',
        thumbnail: resolve('static/icons/file-word.svg'),
        mimetype: 'application/msword'
      }
    case 'docx':
      return {
        description: 'Word Document',
        thumbnail: resolve('static/icons/file-word.svg'),
        mimetype:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }
    case 'xls':
      return {
        description: 'Spreadsheet',
        thumbnail: resolve('static/icons/file-excel.svg'),
        mimetype: 'application/vnd.ms-excel'
      }
    case 'xlsx':
      return {
        description: 'Spreadsheet',
        thumbnail: resolve('static/icons/file-excel.svg'),
        mimetype:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    case 'csv':
      return {
        description: 'CSV',
        thumbnail: resolve('static/icons/file-excel.svg'),
        mimetype: 'text/csv'
      }
    case 'ppt':
      return {
        description: 'PowerPoint',
        thumbnail: resolve('static/icons/file-powerpoint.svg'),
        mimetype: 'application/vnd.ms-powerpoint'
      }
    case 'pptx':
      return {
        description: 'PowerPoint',
        thumbnail: resolve('static/icons/file-powerpoint.svg'),
        mimetype:
          'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      }
    default:
      return {
        description: 'Dropbox File',
        thumbnail: resolve('static/images/file-image.svg'),
        mimetype: 'text'
      }
  }
}
