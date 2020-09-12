/* eslint-disable no-console */
// TODO: add typing shim for dropbox FileMetaData interface

/* eslint-disable camelcase */
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import { sync } from 'mkdirp'

const fetch = require('isomorphic-fetch')

// retrieve dropbox files from 2020 Website folder and output to json file
getDropboxFiles().catch((error) => {
  console.error(error.error ?? error.message ?? error)
})

async function getDropboxFiles() {
  // create dropbox instance
  const { accessToken, appKey, appSecret } = process.env // NOTE: must pass these node env vars
  const options: DropboxTypes.DropboxOptions = {
    fetch,
    accessToken,
    clientId: appKey
  }
  const dropbox = new Dropbox(options)
  dropbox.setClientSecret(appSecret!)

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
  // FIXME: should be typed as PrismicResult[]
  const results = []
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
      blob: { downloadPath: path_lower } as any
    })
  }
  // FIXME: should be typed as PrismicResonseBody
  const responseBody = {
    results_size: results.length,
    results
  }
  // write json output
  const outputFolder = resolve('dist_dropbox')
  sync(outputFolder)
  const savePath = resolve(outputFolder!, '2020_Website.json')
  writeFileSync(savePath, JSON.stringify(responseBody))
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
