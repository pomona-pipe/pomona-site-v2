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
  | 'Video'
  | 'PDF'
  | 'Word Document'
  | 'Spreadsheet'
  | 'PowerPoint'
  | 'File'

  interface FileInfo {
    type: FileType
    s3UploadFolder: string
  }

interface AWSFileUpload {
  uploadPath: string
  fileBuffer: Buffer
}
