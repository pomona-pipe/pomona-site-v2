import express from 'express'
import images from './routes/prismic/images'
import pdfs from './routes/prismic/pdfs'
import docs from './routes/prismic/docs'
import videos from './routes/prismic/videos'

// create express server
const app = express()

// add routes
app.use(images, pdfs, docs, videos)

// Export express app
export default app
