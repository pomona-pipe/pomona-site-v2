import { SHA256, enc } from 'crypto-js'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'
import { prismicMaxPerPage, cloudfrontUrl } from '../data'
import { getFileInfo, getSanitizedFileName, getFileThumbnail } from '../tools'
import { listDropboxFiles } from './dropbox'

export async function createPrismicResults(
  fileTypes: FileType[],
  serverUrl: string,
  page?: number
) {
  const results = (await listDropboxFiles(fileTypes)).map((file) => {
    const fileExtensionLower = file.name
      .substr(file.name.lastIndexOf('.') + 1)
      .toLowerCase()
    file.name = `${file.name.substr(
      0,
      file.name.lastIndexOf('.')
    )}.${fileExtensionLower}`
    return file
  })
  const paginatedResults = page
    ? paginateFiles(results, page, prismicMaxPerPage)
    : results
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
      blob: { fileUrl, fileName: name, thumbnail }
    })
  }

  return {
    results_size: results.length,
    results: prismicResults
  }
}

function paginateFiles(
  files: DropboxTypes.files.FileMetadataReference[],
  page: number,
  resultsLimit: number
) {
  const start = page * resultsLimit - resultsLimit
  const end = start + resultsLimit
  const pageResults = files.slice(start, end)
  return pageResults
}

export async function getPrismicDocuments(
  prismicClient: ResolvedApi,
  predicates: string | string[]
) {
  const response = await prismicClient.query(predicates, {})

  const { results } = response
  let { page, next_page } = response

  while (next_page) {
    const nextResponse = await prismicClient.query(predicates, {
      page: page + 1
    })
    results.push(...nextResponse.results)
    page = nextResponse.page
    next_page = nextResponse.next_page
  }
  return results
}
