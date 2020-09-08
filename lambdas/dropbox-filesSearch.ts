// TODO: add typing shims for dropbox FileMetaData interface

/* eslint-disable camelcase */
import { Handler } from 'aws-lambda'
import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import fetch from 'isomorphic-fetch'

export const handler: Handler = async (event, context, callback) => {
  // create dropbox instance
  const { access_token, app_key, app_secret } = event.headers
  const options = {
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
    max_results: 3,
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
  let error = null
  try {
    const matches = (await dropbox.filesSearchV2(searchV2Arg)).matches
    const blobs: any[] = []
    for (const match of matches) {
      const fileData = await dropbox.filesDownload({
        path: (match.metadata as any).metadata.path_lower
      })
      const buffer = (fileData as any).fileBinary
      blobs.push(buffer)
    }
    const results: PrismicResult[] = matches.map((match, index) => {
      const { id, name, client_modified } = match.metadata as any
      return {
        id,
        title: name,
        description: 'A file from dropbox',
        image_url: '',
        last_update: client_modified,
        blob: blobs[index]
      }
    })
    const responseBody: PrismicResonseBody = {
      results_size: results.length,
      results
    }
    response.body = JSON.stringify(responseBody)
  } catch (err) {
    response.statusCode = 500
    error = err
  }

  // response
  callback(error, response)
}
