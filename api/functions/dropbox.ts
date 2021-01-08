import { dropbox, dropboxRoot } from '../data'
import { getFileInfo } from '../tools'

export async function listDropboxFiles(fileTypes?: FileType[]){
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
  let { cursor, has_more } = listFolderResult
  
  
  // retrieve remaining results
  while (has_more) {
    const remainingListFolderResult = await dropbox.filesListFolderContinue({
      cursor
    })
    const remainingEntries = remainingListFolderResult.entries as DropboxTypes.files.FileMetadataReference[]
    entries.push(...remainingEntries)
    has_more = remainingListFolderResult.has_more
    cursor = remainingListFolderResult.cursor
  }
  // filter just files
  let fileResults = entries.filter((entry) => entry['.tag'] === 'file')

  // filter by fileTypes if provided
  if(fileTypes) {
    fileResults = fileResults.filter((file) =>
      fileTypes.includes(getFileInfo(file.name).type)
    )
  }

  return fileResults
}
