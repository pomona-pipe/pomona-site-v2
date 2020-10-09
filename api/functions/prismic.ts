import { prismicMaxPerPage, cloudfrontUrl } from '../data'
import { getFileInfo, getSanitizedFileName, getFileThumbnail } from '../tools'
import { listDropboxFiles } from './dropbox'
import { SHA256, enc } from 'crypto-js'

export async function createPrismicResults(
    fileTypes: FileType[],
    serverUrl: string,
    page?: number,
  ) {
    const results = await listDropboxFiles(fileTypes)
    const paginatedResults = page ? paginateFiles(results, page, prismicMaxPerPage) : results
    const prismicResults: IPrismicResult[] = []
    for (const file of paginatedResults) {
      const { id, client_modified, name } = file
      const fileInfo = getFileInfo(name)
      const { type, s3UploadFolder } = fileInfo
      const s3Path = `${s3UploadFolder}/${getSanitizedFileName(name)}`
      const fileUrl = `${cloudfrontUrl}/${s3Path}`
      const wordArray = SHA256(id)
      const hashedId = wordArray.toString(enc.Base64) 

      const thumbnail = getFileThumbnail(fileUrl, type, serverUrl)
      prismicResults.push({
        id: hashedId,
        title: name,
        description: type,
        image_url: thumbnail,
        last_update: Number(new Date(client_modified)),
        blob: { fileUrl }
      })
    }

    return {
        results_size: results.length,
        results: prismicResults
      }
  }

  function paginateFiles(files: DropboxTypes.files.FileMetadataReference[], page: number, resultsLimit: number) {
    const start = page * resultsLimit - resultsLimit
    const end = start + resultsLimit
    const pageResults = files.slice(start, end)
    return pageResults
  }
