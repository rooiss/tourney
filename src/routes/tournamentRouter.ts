import { Router } from 'express'
import { getUserById } from '../stores/users'
import { newTournament } from '../stores/tournaments'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.post(
  '/',
  asyncHandler(async (req: any, res) => {
    // console.log('req.body', req.body)
    const tourney = req.body
    // console.log('req.session', req.session)
    const creator = await getUserById(req.session.user.id)
    await newTournament(tourney, creator)
    res.json({ success: true })
  }),
)

router.get(
  '/',
  asyncHandler(async (req: any, res) => {
    // return json
    return res.json()
  }),
)

export default router
