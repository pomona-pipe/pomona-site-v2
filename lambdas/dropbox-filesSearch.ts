// TODO: add typing shim for dropbox FileMetaData interface

/* eslint-disable camelcase */
import { resolve } from 'path'
import { Handler } from 'aws-lambda'
import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import fetch from 'isomorphic-fetch'
// TODO: remove unused lib after deciding betweeen Blob vs base64String
import { encode } from 'base64-arraybuffer'
import Blob from 'cross-blob'

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

export const handler: Handler = async (event) => {
  // create dropbox instance
  const { access_token, app_key, app_secret } = event.headers
  const options: DropboxTypes.DropboxOptions = {
    fetch,
    accessToken: access_token,
    clientId: app_key
  }
  const dropbox = new Dropbox(options)
  dropbox.setClientSecret(app_secret)

  // destructure event queryString parameters
  const {
    query,
    searchOptions,
    match_field_options,
    include_highlights
  } = event.queryStringParameters

  const defaultSearchOptions = {
    path: '/2020 Website',
    max_results: 1,
    file_status: { '.tag': 'active' },
    file_categories: [{ '.tag': 'image' }, { '.tag': 'pdf' }]
  }

  // structure function arg
  const searchV2Arg: DropboxTypes.files.SearchV2Arg = {
    query: query || '',
    options: searchOptions || defaultSearchOptions,
    match_field_options,
    include_highlights: include_highlights
      ? JSON.parse(include_highlights)
      : false
  }

  // query dropbox folder
  const response: PrismicResponse = {
    statusCode: 200
  }
  try {
    const matches = (await dropbox.filesSearchV2(searchV2Arg)).matches
    const results: PrismicResult[] = []
    for (const match of matches) {
      const {
        id,
        name,
        client_modified,
        path_lower
      } = (match.metadata as any).metadata
      const fileBuffer = ((await dropbox.filesDownload({
        path: path_lower
      })) as any).fileBinary
      const docType = getDocType(name)
      const { description, thumbnail, mimetype } = docType
      /*
       ** TODO: decide whether a Blob is possible to pass thru JSON
       ** currently using base64String instead
       */
      // const blob = new Blob(fileBuffer, { type: mimetype })
      const base64String = encode(fileBuffer)
      results.push({
        id,
        title: name,
        description,
        image_url: thumbnail,
        last_update: client_modified,
        blob: base64String
      })
    }
    const responseBody: PrismicResonseBody = {
      results_size: results.length,
      results
    }
    response.body = JSON.stringify(responseBody)
    return response
  } catch (error) {
    response.statusCode = 500
    response.body = error.message
    return response
  }
}
