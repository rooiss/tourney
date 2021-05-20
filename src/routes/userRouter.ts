import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.post(
  '/signup',
  asyncHandler(async (req, res) => {}),
)
router.post(
  '/username',
  asyncHandler(async (req, res) => {}),
)

export default router
