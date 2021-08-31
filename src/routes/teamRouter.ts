import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler'
import {
  acceptTeamInviteStore,
  rejectTeamInviteStore,
} from '../stores/teamInvite'
import {
  getAllTeamsByTournamentId,
  getTournamentTeamByUserId,
} from '../stores/team'
import { teamEntityToJson } from '../mappers/teamEntityToJson'

const router = Router({ mergeParams: true })

// accept team invite
router.post(
  '/:teamInviteId/accept',
  asyncHandler(async (req: any, res) => {
    const teamInviteId = req.params.teamInviteId
    const currentUser = req.session.user
    try {
      await acceptTeamInviteStore(teamInviteId, currentUser)
      res.json({
        success: true,
      })
    } catch (e) {
      console.error('teamRouter error:', e)
      res.status(500).json({ success: false })
    }
  }),
)

// reject team invite
router.post(
  '/:teamInviteId/reject',
  asyncHandler(async (req: any, res) => {
    const teamInviteId = req.params.teamInviteId
    try {
      await rejectTeamInviteStore(teamInviteId)
      res.json({
        success: true,
      })
    } catch (e) {
      console.error('teamRouter error:', e)
      res.status(500).json({ success: false })
    }
  }),
)

// check to see if user is on a team
router.get(
  '/currentTeam',
  asyncHandler(async (req: any, res) => {
    const tournamentId = req.params.tournamentId
    const userId = req.session.user.id
    const team = await getTournamentTeamByUserId(userId, tournamentId)
    console.log('route to current team')
    return res.json({
      success: true,
      team: teamEntityToJson(team),
    })
  }),
)

// get all teams from tournament
router.get(
  '/teams',
  asyncHandler(async (req: any, res) => {
    const tournamentId = req.params.tournamentId
    const allTeams = await getAllTeamsByTournamentId(tournamentId)
    return res.json({
      success: true,
      allTeams: allTeams.map(teamEntityToJson),
    })
  }),
)

export default router
