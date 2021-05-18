import express from 'express'
import { setupDB } from './setup-db'
import asyncHandler from './utils/asyncHandler'

const app = express()

setupDB()

app.get(
  '/',
  asyncHandler(async (req, res) => {}),
)

app.listen(5000, () => {
  console.log('server listening on port 5000')
})
