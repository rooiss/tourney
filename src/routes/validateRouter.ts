import { Router } from 'express'
import { getTeamByTournament } from '../stores/team'
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

router.post(
  '/:tournamentId/teamname',
  asyncHandler(async (req, res) => {
    const teamName = req.body.teamName
    const tournamentId = req.params.tournamentId

    const team = await getTeamByTournament(tournamentId, teamName)
    if (team) {
      res.status(400).json({ success: false })
      console.log('team name already exists')
      return
    }
    return res.json({
      valid: team === undefined,
    })
  }),
)

export default router
