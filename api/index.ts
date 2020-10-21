import express from 'express'
import images from './routes/prismic/images'
import pdfs from './routes/prismic/pdfs'
import docs from './routes/prismic/docs'
import videos from './routes/prismic/videos'
import slackChannelPost from './routes/forms/slackChannelPost'
import sendEmail from './routes/forms/sendEmail'

// create express server
const app = express()

// enable body parsing for post requests
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

// add routes
app.use(images, pdfs, docs, videos, slackChannelPost, sendEmail)

// Export express app
export default app
