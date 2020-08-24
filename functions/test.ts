/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handler } from 'aws-lambda'

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const name = event.queryStringParameters.name || 'World'

  return {
    statusCode: 200,
    body: `Hello, ${name}`
  }
}

exports.handler = handler
