import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import fetch from 'isomorphic-fetch'

// aws
export const cloudfrontUrl = 'https://d1q9m55kyvgl4s.cloudfront.net'

// dropbox
export const dropboxRoot = '/2020 Website'
export const dropbox = (() => {
  const {
    DROPBOX_APP_KEY,
    DROPBOX_APP_SECRET,
    DROPBOX_ACCESS_TOKEN
  } = process.env
  const options: DropboxTypes.DropboxOptions = {
    fetch,
    accessToken: DROPBOX_ACCESS_TOKEN!,
    clientId: DROPBOX_APP_KEY!
  }
  const dropbox = new Dropbox(options)
  dropbox.setClientSecret(DROPBOX_APP_SECRET!)
  return dropbox
})()

// prismic
export const prismicMaxPerPage = 50
