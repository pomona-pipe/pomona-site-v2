import express from 'express'
import dropbox from './routes/dropbox'

// create express server
const app = express()

// add routes
app.use(dropbox)

// Export express app
export default app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
