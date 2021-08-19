import { Router } from 'express'
import { getFollowedUsers, getUserById } from '../stores/users'
import { getTournamentById } from '../stores/tournaments'
import asyncHandler from '../utils/asyncHandler'
import { rejectTeamInvite } from '../stores/teamInvite'

const router = Router({ mergeParams: true })

// // create team by tournament
// router.post(
//   '/',
//   asyncHandler(async (req: any, res) => {
//     console.log('req.body', req.body)
//     try {
//       res.json({
//         success: true,
//       })
//     } catch (e) {
//       console.error('teamRouter error:', e)
//       res.status(500).json({ success: false })
//     }
//   }),
// )

// // get all teams by tournament
// router.get(
//   '/',
//   asyncHandler(async (req: any, res) => {
//     // return json
//     return res.json({})
//   }),
// )

// accept team invite

// reject team invite
router.post(
  '/:teamInviteId/reject',
  asyncHandler(async (req: any, res) => {
    // const tournamentId = req.params.tournamentId
    const teamInviteId = req.params.teamInviteId

    try {
      await rejectTeamInvite(teamInviteId)
      res.json({
        success: true,
      })
    } catch (e) {
      console.error('teamRouter error:', e)
      res.status(500).json({ success: false })
    }
  }),
)

export default router
