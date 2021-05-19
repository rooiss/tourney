import { Router } from 'express'
import { getUserByEmail, getUserByUsername } from '../stores/users'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.post(
  '/email',
  asyncHandler(async (req, res) => {
    // query database for user with this email
    const user = await getUserByEmail(req.body.email)
    // console.log('user', user)
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
    const user = await getUserByUsername(req.body.username)
    res.json({
      valid: user === undefined,
    })
  }),
)

export default router
