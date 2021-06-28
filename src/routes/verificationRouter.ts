import { Router } from 'express'
import { sendVerificationEmail, verifyUser } from '../stores/verify'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.get(
  '/',
  asyncHandler(async (req: any, res) => {
    const verificationCode = req.session.user.verifyCode
    const email = req.session.user.email
    console.log('session email', email)
    try {
      await sendVerificationEmail(verificationCode, email)
      res.json({ success: true })
    } catch (e) {
      console.log(
        'something went wrong with sending the email in the router',
        e,
      )
      // send error response back
      res.status(500).json({ success: false })
    }
  }),
)

router.get(
  '/confirm',
  asyncHandler(async (req: any, res) => {
    // always check to see if user is logged in on backend
    if (req.session) {
      const user = req.session.user.id
      await verifyUser(user)
      // update session as well since verifyUser is only updating store
      req.session.user.verified = true
      res.json({ success: true })
      return
    }
    res.status(500).json({ success: false })
  }),
)

export default router
