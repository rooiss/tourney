import { Request, Router } from 'express'
import { setUserToSession } from '../stores/sessions'
import { createUser, getUserByEmail } from '../stores/users'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.post(
  '/signup',
  asyncHandler(async (req: any, res) => {
    const user = req.body
    try {
      const newUser = await createUser(user)
      setUserToSession(req, newUser)
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
  asyncHandler(async (req: any, res) => {
    const user = req.body
    const userByEmail = await getUserByEmail(user.email)
    if (!userByEmail) {
      console.log('SOMETHING HEREEEEEEE=============')
      // return stuff by conditional statements or
      // else it will keep running the code
      return res.status(400).json({ success: false })
    }
    if (user.password !== userByEmail.password) {
      console.log('PASSWORDS DONT MATCH DUDEE ======>')
      return res.status(400).json({ success: false })
    } else {
      // console.log('form password ========', user.password)
      // console.log('User obj password', userByEmail.password)
      setUserToSession(req, userByEmail)
      console.log('SESSION WORKED============', req.session)
      return res.json({ success: true })
    }
  }),
)
router.get(
  '/whoami',
  asyncHandler(async (req: any, res) => {
    return res.json({ user: req.session.user })
  }),
)

export default router
