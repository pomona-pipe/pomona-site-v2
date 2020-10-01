import { Request } from 'express'
import ImgixClient from 'imgix-core-js'

export function getServerUrl(request: Request) {
  const serverUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${request.hostname}`
  return serverUrl
}

export function getFileInfo(fileName: string): FileInfo {
  const suffix = fileName
    .split('.')
    .slice(-1)[0]
    .toLowerCase()
  switch (suffix) {
    case 'png':
    case 'jpg':
    case 'jpeg':
      return {
        type: 'Image',
        folder: 'images'
      }
    case 'pdf':
      return {
        type: 'PDF',
        folder: 'pdfs'
      }
    case 'doc':
    case 'docx':
      return {
        type: 'Word Document',
        folder: 'docs'
      }
    case 'xls':
    case 'xlsx':
    case 'csv':
      return {
        type: 'Spreadsheet',
        folder: 'spreadsheets'
      }
    case 'ppt':
    case 'pptx':
      return {
        type: 'PowerPoint',
        folder: 'powerpoints'
      }
    default:
      return {
        type: 'File',
        folder: 'other-files'
      }
  }
}

export function getFileThumbnail(fileUrl: string, fileType: FileType, serverUrl: string) {
  switch (fileType) {
    case 'Image':
      return getImgixThumbnail(fileUrl)
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

function getImgixThumbnail(imgLink: string) {
  const { IMGIX_DOMAIN, IMGIX_SECURE_URL_TOKEN } = process.env
  const client = new ImgixClient({
    domain: IMGIX_DOMAIN!,
    secureURLToken: IMGIX_SECURE_URL_TOKEN
  })
  return client.buildURL(`${imgLink}?w=80&h=80`)
}
