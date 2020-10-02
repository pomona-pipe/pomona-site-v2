import { prismicMaxPerPage, cloudfrontUrl } from '../data'
import { getFileInfo, getSanitizedFileName, getFileThumbnail } from '../tools'
import { getDropboxFiles } from './dropbox'

export async function createPrismicResults(
    fileTypes: FileType[],
    serverUrl: string,
    page?: number,
  ) {
    // build results
    const pagination = page ? { page, resultsLimit: prismicMaxPerPage } : undefined
    const files = await getDropboxFiles(fileTypes, pagination)
    const results: IPrismicResult[] = []
    for (const file of files) {
      const { id, client_modified, name } = file
      const fileInfo = getFileInfo(name)
      const { type, s3UploadFolder } = fileInfo
      const s3Path = `${s3UploadFolder}/${getSanitizedFileName(name)}`
      const fileUrl = `${cloudfrontUrl}/${s3Path}`
  
      const thumbnail = getFileThumbnail(fileUrl, type, serverUrl)
      results.push({
        id,
        title: name,
        description: type,
        image_url: thumbnail,
        last_update: Number(new Date(client_modified)),
        blob: { fileUrl }
      })
    }
  
    return {
        results_size: results.length,
        results
      }
  }