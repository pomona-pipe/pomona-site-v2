/* eslint-disable camelcase */
interface PrismicResult {
  id: string
  title: string
  description: string
  image_url: string
  last_update: string
  blob: ArrayBuffer
}

interface PrismicResonseBody {
  results_size: number
  results: PrismicResult[]
}

interface PrismicResponse {
  statusCode: number
  body?: string
}
