import { Router } from 'express'
import { setUserToSession } from '../stores/sessions'
import { createUser, getUserByEmail, searchUsersByAll } from '../stores/users'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.post(
  '/signup',
  asyncHandler(async (req: any, res) => {
    const user = req.body
    try {
      // const newUser = await createUser({ ...user, password: hashFunction(user.password) })
      const newUser = await createUser({ ...user, password: user.password })
      setUserToSession(req, newUser)
      res.json({ success: true })
    } catch (e) {
      ;-(
        // these errors would occur if the db connection was down
        // or if the insert query failed
        console.error('create user failed', e)
      )
      // send error response back
      res.status(500).json({ success: false })
    }
  }),
)

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const user = req.body
    const userByEmail = await getUserByEmail(user.email)
    if (!userByEmail) {
      // return stuff by conditional statements or
      // else it will keep running the code
      return res.status(400).json({ success: false })
    }
    // if (hashFunction(user.password) !== userByEmail.password) {
    if (user.password !== userByEmail.password) {
      return res.status(400).json({ success: false })
    } else {
      setUserToSession(req, userByEmail)
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

router.get('/logout', (req: any, res) => {
  if (req.session) {
    req.session.destroy()
    return res.json({ success: true })
  }
  return res.json({ success: true })
})

router.get(
  '/search',
  asyncHandler(async (req, res) => {
    // get term from req.query
    let results = await searchUsersByAll(req.query.term as string)
    return res.json({
      results: results.map((u) => ({
        firstName: u.firstName,
        lastNameLetter: u.lastName.charAt(0),
        username: u.username,
        id: u.id,
      })),
      term: req.query.term,
    })
  }),
)

export default router
