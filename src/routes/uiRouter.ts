import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

// get google places api key
router.get(
  '/',
  asyncHandler(async (req: any, res) => {
    res.json({
      GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY,
    })
  }),
)

export default router
