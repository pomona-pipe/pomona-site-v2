/* eslint-disable require-await */
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Handler } from 'aws-lambda'

export const handler: Handler = async (event) => {
  const response: PrismicResponse = {
    statusCode: 200
  }
  const fileBuffer = readFileSync(resolve('/dist_dropbox/2020_Website.json'))
  response.body = fileBuffer
  return response
}
