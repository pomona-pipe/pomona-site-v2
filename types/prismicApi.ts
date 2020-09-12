/* eslint-disable camelcase */

interface PrismicBlob {
  file: string
}
interface PrismicResult {
  id: string
  title: string
  description: string
  image_url: string
  last_update: number
  blob: PrismicBlob
}

interface PrismicResonseBody {
  results_size: number
  results: PrismicResult[]
}

interface PrismicResponse {
  statusCode: number
  body?: Buffer
}
