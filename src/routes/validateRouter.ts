import { Router } from 'express'
import { getUserByEmail } from 'src/stores/users'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.post(
  '/email',
  asyncHandler(async (req, res) => {
    // query database for user with this email
    const user = await getUserByEmail(req.body.email)
    // if user doesn't exist then return valid
    res.json({
      valid: user === undefined,
    })
  }),
)
router.post(
  '/username',
  asyncHandler(async (req, res) => {
    // query database for user with this username
  }),
)

export default router
