/* eslint-disable camelcase */
import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import fetch from 'isomorphic-fetch'

export async function createFileResults(
  dropboxPath: string,
  fileTypes: FileType[],
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
  // TODO: get a specified file type
  const files = await getDropboxFilesByPage(
    dropboxPath,
    dropbox,
    page,
    show,
    fileTypes
  )
  const results: IPrismicResult[] = []
  for (const file of files) {
    const { id, name, client_modified, path_lower } = file
    const fileType = getFileType(name)
    const thumbnail = getThumbnail(fileType, serverUrl)
    const fileUrl = await getDropboxSharedLink(path_lower!, dropbox)
    results.push({
      id,
      title: name,
      description: fileType,
      image_url: thumbnail,
      last_update: Number(new Date(client_modified)),
      blob: { fileUrl }
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
  show: number,
  fileTypes: FileType[]
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
  let fileResults = entries.filter((entry) => entry['.tag'] === 'file')
  // filter file types
  if (fileTypes) {
    fileResults = fileResults.filter((file) =>
      fileTypes.includes(getFileType(file.name))
    )
  }
  // return correct page
  const start = page * show - show
  const end = start + show
  const pageResults = fileResults.slice(start, end)
  return pageResults
}

async function getDropboxSharedLink(path: string, dropbox: Dropbox) {
  // obtain file url from shared link
  let sharedLink: string
  // try get existing shared link
  try {
    const listLinkArg: DropboxTypes.sharing.ListSharedLinksArg = {
      path,
      direct_only: true
    }
    sharedLink = (await dropbox.sharingListSharedLinks(listLinkArg)).links[0]
      .url
  } catch (error) {
    // else create shared link
    const createLinkArg: DropboxTypes.sharing.CreateSharedLinkWithSettingsArg = {
      path
    }
    sharedLink = (
      await dropbox.sharingCreateSharedLinkWithSettings(createLinkArg)
    ).url
  }
  return sharedLink
}

function getFileType(fileName: string): FileType {
  const suffix = fileName
    .split('.')
    .slice(-1)[0]
    .toLowerCase()
  switch (suffix) {
    case 'png':
    case 'jpg':
    case 'jpeg':
      return 'Image'
    case 'pdf':
      return 'PDF'
    case 'doc':
    case 'docx':
      return 'Word Document'
    case 'xls':
    case 'xlsx':
    case 'csv':
      return 'Spreadsheet'
    case 'ppt':
    case 'pptx':
      return 'PowerPoint'
    default:
      return 'File'
  }
}

function getThumbnail(fileType: FileType, serverUrl: string) {
  switch (fileType) {
    case 'Image':
      return `${serverUrl}/images/placeholders/file-image.svg`
    case 'PDF':
      return `${serverUrl}/icons/file-pdf.svg`
    case 'Word Document':
      return `${serverUrl}/icons/file-word.svg`
    case 'Spreadsheet':
      return `${serverUrl}/icons/file-excel.svg`
    case 'PowerPoint':
      return `${serverUrl}/icons/file-powerpoint.svg`
    default:
      return `${serverUrl}/images/file-image.svg`
  }
}
