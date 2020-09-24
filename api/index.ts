import express from 'express'
import images from './routes/dropbox/images'
import pdfs from './routes/dropbox/pdfs'
import docs from './routes/dropbox/docs'

// create express server
const app = express()

// add routes
app.use(images, pdfs, docs)

// Export express app
export default app
