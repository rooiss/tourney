import { Request, Router } from 'express'
import { IRequest } from '../types/request'
import { sessionHelper } from '../stores/sessions'
import { createUser } from '../stores/users'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.post(
  '/signup',
  asyncHandler(async (req: any, res) => {
    const user = req.body
    try {
      const newUser = await createUser(user)
      // req.login()
      if (req.session) {
        req.session.user = user
      }
      sessionHelper(req, newUser)
      res.json({ success: true })
    } catch (e) {
      // these errors would occur if the db connection was down
      // or if the insert query failed
      console.error('create user failed', e)
      // send error response back
      res.status(500).json({ success: false })
    }
  }),
)

router.post(
  '/login',
  asyncHandler(async (req: any, res) => {}),
)
router.post(
  '/whoami',
  asyncHandler(async (req: Request, res) => {}),
)

export default router
