import { dropbox, dropboxRoot } from '../data'
import { getFileInfo } from '../tools'

export async function getDropboxFilesByPage(page: number, resultsPerPage: number, fileTypes: FileType[]) {
  let fileResults = await listDropboxFiles()
  
  // filter file types
  fileResults = fileResults.filter((file) =>
    fileTypes.includes(getFileInfo(file.name).type)
  )
  // return correct page
  const start = page * resultsPerPage - resultsPerPage
  const end = start + resultsPerPage
  const pageResults = fileResults.slice(start, end)
  return pageResults
}

export async function listDropboxFiles(){
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
  const fileResults = entries.filter((entry) => entry['.tag'] === 'file')
  return fileResults
}
