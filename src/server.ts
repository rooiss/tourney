import express from 'express'
import { setupDB } from './setup-db'
import asyncHandler from './utils/asyncHandler'
import validateRouter from './routes/validateRouter'

const app = express()
app.use('/api/validate', validateRouter)
app.use(express.urlencoded({ extended: false }))

setupDB()

app.get(
  '/',
  asyncHandler(async (req, res) => {}),
)

app.listen(5000, () => {
  console.log('server listening on port 5000')
})
