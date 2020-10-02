import express from 'express'
import images from './routes/dropbox/images'
import pdfs from './routes/dropbox/pdfs'
import docs from './routes/dropbox/docs'
import videos from './routes/dropbox/videos'

// create express server
const app = express()

// add routes
app.use(images, pdfs, docs, videos)

// Export express app
export default app
