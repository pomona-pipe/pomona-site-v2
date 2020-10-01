import { dropbox, dropboxRoot, prismicMaxPerPage } from '../data'
import { getFileInfo, getFileThumbnail } from '../tools'

export async function createFileResults(
  fileTypes: FileType[],
  page: number,
  serverUrl: string
) {
  // build results
  const files = await getDropboxFilesByPage(page, fileTypes)
  const results: IPrismicResult[] = []
  // TODO: typing for filePath object: dropboxPath, savePath
  const filePaths: any[] = []
  for (const file of files) {
    const { id, client_modified, path_lower } = file
    const name = file.name.split(' ').join('_')
    const fileInfo = getFileInfo(name)
    const { type, folder } = fileInfo
    const filePath = `${folder}/${name}`
    const fileUrl = `${serverUrl}/${filePath}`

    const thumbnail = getFileThumbnail(fileUrl, type, serverUrl)
    results.push({
      id,
      title: name,
      description: type,
      image_url: thumbnail,
      last_update: Number(new Date(client_modified)),
      blob: { fileUrl }
    })
    filePaths.push({
      dropboxPath: path_lower!,
      dropboxModified: client_modified,
      s3UploadPath: filePath
    })
  }
  // structure response
  const response = {
    prismic: {
      results_size: results.length,
      results
    },
    filePaths
  }
  return response
}

async function getDropboxFilesByPage(page: number, fileTypes: FileType[]) {
  // structure ListFolder Arg
  const listFolderArg: DropboxTypes.files.ListFolderArg = {
    path: dropboxRoot,
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
  fileResults = fileResults.filter((file) =>
    fileTypes.includes(getFileInfo(file.name).type)
  )
  // return correct page
  const start = page * prismicMaxPerPage - prismicMaxPerPage
  const end = start + prismicMaxPerPage
  const pageResults = fileResults.slice(start, end)
  return pageResults
}
