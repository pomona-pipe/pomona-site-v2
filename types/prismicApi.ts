/* eslint-disable camelcase */
interface IPrismicBlob {
  fileUrl: string
  fileName: string
  thumbnail: string
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

type ContentType =
  | 'image/png'
  | 'image/jpeg'
  | 'video/mp4'
  | 'video/quicktime'
  | 'video/x-ms-asf'
  | 'video/x-flv'
  | 'video/x-msvideo'
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  | 'text/csv'
  | 'text'

type S3UploadFolder =
| 'images'
| 'videos'
| 'pdfs'
| 'docs'
| 'spreadsheets'
| 'powerpoints'
| 'other-files'

interface FileInfo {
  type: FileType
  contentType: ContentType
  s3UploadFolder: string
}

interface AWSFileUpload {
  uploadPath: string
  fileBuffer: Buffer
  contentType: ContentType
}

interface DropboxSearchPagination {
  page: number
  resultsLimit: number
}
