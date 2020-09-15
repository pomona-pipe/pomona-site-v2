import express from 'express'
import dropbox from './routes/dropbox'

// create express server
const app = express()

// add routes
app.use(dropbox)

// Export express app
export default app
