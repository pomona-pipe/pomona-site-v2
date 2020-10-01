import { ObjectList as S3ObjectList } from 'aws-sdk/clients/s3'
import moment from 'moment'
import { s3ListFiles, s3UploadFile, s3DeleteFiles } from './aws'
import { dropbox } from './dropbox'

export async function updateS3FromDropbox(
  dropboxFiles: any[]
) {
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
  dropboxFiles: any[],
  s3Files: S3ObjectList
) {
  let newFileCount = 0
  let updatedFileCount = 0
  for (const dropboxFile of dropboxFiles) {
    const { dropboxPath, dropboxModified, s3UploadPath } = dropboxFile
    let isUploaded = false
    let isUpdated = false
    s3Files.forEach((s3File) => {
      if(s3UploadPath === s3File.Key) {
        isUploaded = true
        return
      }
      if(moment(dropboxModified).isAfter(s3File.LastModified)) {
        isUpdated = true
        return
      }
    })
    const shouldUpdate = !isUploaded || isUpdated
    if (!shouldUpdate) continue
    const fileBuffer = ((await dropbox.filesDownload({
      path: dropboxPath
    })) as any).fileBinary as Buffer
    await s3UploadFile({
      uploadPath: s3UploadPath,
      fileBuffer
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

async function updateDeletions(dropboxFiles: any[], s3Files: S3ObjectList) {
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
      (dropboxFile) => s3File.Key === dropboxFile.s3UploadPath
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
