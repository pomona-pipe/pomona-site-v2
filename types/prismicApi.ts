/* eslint-disable camelcase */
interface IPrismicBlob {
  fileUrl: string
}

interface IPrismicResult {
  id: string
  title: string
  description: string
  image_url: string
  last_update: number
  blob: IPrismicBlob
}

interface IPrismicResponse {
  results_size: number
  results: IPrismicResult[]
}

type FileType =
  | 'Image'
  | 'Word Document'
  | 'PDF'
  | 'Word Document'
  | 'Spreadsheet'
  | 'PowerPoint'
  | 'File'
