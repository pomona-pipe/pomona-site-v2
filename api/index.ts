import express from 'express'
import images from './routes/dropbox/images'
import pdfs from './routes/dropbox/pdfs'

// create express server
const app = express()

// add routes
app.use(images, pdfs)

// Export express app
export default app
