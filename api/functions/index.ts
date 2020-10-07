import { ObjectList as S3ObjectList } from 'aws-sdk/clients/s3'
import moment from 'moment'
import { s3ListFiles, s3UploadFile, s3DeleteFiles } from './aws'
import { dropbox } from '../data'
import { getFileInfo, getSanitizedFileName } from '../tools'
import {listDropboxFiles} from './dropbox'

export async function updateS3FromDropbox() {

  const dropboxFiles = await listDropboxFiles()
  // get S3 files
  const s3Files = await s3ListFiles()

  /* Copy files from Dropbox to S3 if one of the following is true
   **   1. File does not exist on S3
   **   2. File has been updated on Dropbox
   */
  await updateNewFiles(dropboxFiles, s3Files)

  // Delete files from S3 if removed from Dropbox
  await updateDeletions(dropboxFiles, s3Files)
}

async function updateNewFiles(
  dropboxFiles: DropboxTypes.files.FileMetadataReference[],
  s3Files: S3ObjectList
) {
  let newFileCount = 0
  let updatedFileCount = 0
  for (const dropboxFile of dropboxFiles) {
    const dropboxPath = dropboxFile.path_lower!
    const dropboxModified = dropboxFile.client_modified
    const fileInfo = getFileInfo(dropboxFile.name)
    const { s3UploadFolder, contentType } = fileInfo
    const s3UploadPath = `${s3UploadFolder}/${getSanitizedFileName(dropboxFile.name)}`

    let isUploaded = false
    let isUpdated = false
    for(const s3File of s3Files) {
      // if dropbox upload does not match s3, continue to next s3 file
      if(s3UploadPath !== s3File.Key) continue
      // match found - file has been uploaded to s3
      isUploaded = true
      // if dropbox modified is after s3 modified, file should be updated
      if(moment(dropboxModified).isAfter(s3File.LastModified)) {
        console.log(`dropboxModified: ${dropboxModified}, s3Modified: ${s3File.LastModified}`)
        isUpdated = true
      }
      // stop checking s3 files since match was found
      break
    }
    const shouldUpload = !isUploaded || isUpdated
    if (!shouldUpload) continue
    const fileBuffer = ((await dropbox.filesDownload({
      path: dropboxPath
    })) as any).fileBinary as Buffer
    await s3UploadFile({
      uploadPath: s3UploadPath,
      fileBuffer,
      contentType: contentType
    })
    if(isUpdated) {
      updatedFileCount++
      console.log(`${s3UploadPath} updated on S3`)
    } else {
      newFileCount++
      console.log(`${s3UploadPath} uploaded to S3`)
    }
  }
  console.log(`\n${newFileCount} files added to S3\n${updatedFileCount} files updated on S3`)
}

async function updateDeletions(dropboxFiles: DropboxTypes.files.FileMetadataReference[], s3Files: S3ObjectList) {
  let deleteCount = 0
  // if no files exist on S3, return
  const doS3FilesExist = s3Files.length > 0
  if(!doS3FilesExist) {
    return console.log(`${deleteCount} files deleted from S3`)
  }
  // else, delete files if necessary
  const deleteFromS3: string[] = []
  for (const s3File of s3Files) {
    const isOnDropbox = dropboxFiles.some(
      (dropboxFile) => {
        const { name } = dropboxFile
        const s3Folder = getFileInfo(name).s3UploadFolder
        return s3File.Key!.includes(`${s3Folder}/${getSanitizedFileName(name)}`)
      }
    )
    if (!isOnDropbox) {
      deleteFromS3.push(s3File.Key!)
      deleteCount++
    }
  }
  if (deleteCount > 0) {
    await s3DeleteFiles(deleteFromS3)
    console.log('\n')
    deleteFromS3.forEach((file) => {
      console.log(`${file} deleted from S3`)
    })
  }
  console.log(`\n${deleteCount} files deleted from S3`)
}
