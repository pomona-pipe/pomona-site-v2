import { Handler } from 'aws-lambda'
import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import fetch from 'isomorphic-fetch'

interface Response {
  statusCode: number
  body?: string
}

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
    path,
    recursive,
    include_media_info,
    include_deleted,
    include_has_explicit_shared_members,
    include_mounted_folders,
    limit,
    shared_link,
    include_property_groups,
    include_non_downloadable_files
  } = event.queryStringParameters

  // structure function arg
  const listFolderArg = {
    path: path || '/2020 Website',
    recursive: recursive ? JSON.parse(recursive) : false,
    include_media_info: include_media_info
      ? JSON.parse(include_media_info)
      : false,
    include_deleted: include_deleted ? JSON.parse(include_deleted) : false,
    include_has_explicit_shared_members: include_has_explicit_shared_members
      ? JSON.parse(include_has_explicit_shared_members)
      : false,
    include_mounted_folders: include_mounted_folders
      ? JSON.parse(include_mounted_folders)
      : true,
    limit,
    shared_link,
    include_property_groups,
    include_non_downloadable_files: include_non_downloadable_files
      ? JSON.parse(include_non_downloadable_files)
      : true
  }

  // query dropbox folder
  const response: Response = {
    statusCode: 200
  }
  let error = null
  try {
    const result = (await dropbox.filesListFolder(listFolderArg)).entries
    response.body = JSON.stringify(result)
  } catch (err) {
    response.statusCode = 500
    error = err
  }

  // response
  callback(error, response)
}
