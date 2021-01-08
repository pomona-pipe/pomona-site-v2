import { ObjectList as S3ObjectList } from 'aws-sdk/clients/s3'
import moment from 'moment'
import { s3ListFiles, s3UploadFile, s3DeleteFiles } from './aws'
import { dropbox } from '../data'
import { getFileInfo, getSanitizedFileName } from '../tools'
import { listDropboxFiles } from './dropbox'

interface S3Upload {
  uploadPath: string
  fileBuffer: Buffer
  contentType: ContentType
}

interface S3FileUploadResults {
  newFiles: S3Upload[]
  updatedFiles: S3Upload[]
}

export default async function s3UpdateFromDropbox() {

  const dropboxFiles = (await listDropboxFiles()).map((file) => {
    const fileExtensionLower = file.name.substr((file.name.lastIndexOf('.') + 1)).toLowerCase()
    file.name = `${file.name.substr(0, file.name.lastIndexOf('.'))}.${fileExtensionLower}`
    return file
  })
  // get S3 files
  const s3Files = await s3ListFiles()

  /* Copy files from Dropbox to S3 if one of the following is true
   **   1. File does not exist on S3
   **   2. File has been updated on Dropbox
   */
  const uploaded = await updateNewFiles(dropboxFiles, s3Files)

  // Delete files from S3 if removed from Dropbox
  const deleted = await updateDeletions(dropboxFiles, s3Files)

  return {
    uploaded,
    deleted
  }
}

async function updateNewFiles(
  dropboxFiles: DropboxTypes.files.FileMetadataReference[],
  s3Files: S3ObjectList
) {
  const newFileUploadResult: S3FileUploadResults = {
    newFiles: [],
    updatedFiles: []
  }
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
    const s3Upload: S3Upload = {
      uploadPath: s3UploadPath,
      fileBuffer,
      contentType: contentType
    }
    await s3UploadFile(s3Upload)
    if(isUpdated) {
      newFileUploadResult.updatedFiles.push(s3Upload)
    } else {
      newFileUploadResult.newFiles.push(s3Upload)
    }
  }
  return newFileUploadResult
}

async function updateDeletions(dropboxFiles: DropboxTypes.files.FileMetadataReference[], s3Files: S3ObjectList) {
  const deletedFileResult: S3ObjectList = []
  // if no files exist on S3, return
  const doS3FilesExist = s3Files.length > 0
  if(!doS3FilesExist) {
    return deletedFileResult
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
      deletedFileResult.push(s3File)
    }
  }
  if (deleteFromS3.length > 0) {
    await s3DeleteFiles(deleteFromS3)
  }
  return deletedFileResult
}
