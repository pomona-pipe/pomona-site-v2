import { Handler } from 'aws-lambda'
import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import fetch from 'isomorphic-fetch'

export const handler: Handler = async (event, context) => {
  const { access_token, client_id, secret } = event.headers
  const options = {
    accessToken: access_token,
    clientId: client_id,
    fetch
  }
  const dropbox = new Dropbox(options)
  dropbox.setClientSecret(secret)
  const testApp = event.queryStringParameters.app || 'testApp'
  const appResult = (await dropbox.checkApp({ query: testApp })).result
  const testUser = event.queryStringParameters.user || 'testUser'
  const userResult = (await dropbox.checkUser({ query: testUser })).result
  return {
    statusCode: 200,
    body: `app: ${appResult}\nuser: ${userResult}`
  }
}
