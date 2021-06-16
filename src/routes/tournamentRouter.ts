import { Router } from 'express'
import { getUserById } from '../stores/users'
import { getTournamentById, newTournament } from '../stores/tournaments'
import asyncHandler from '../utils/asyncHandler'
import { tournamentEntityToJson } from '../mappers/tournamentEntityToJson'

const router = Router()

// create tournament
router.post(
  '/',
  asyncHandler(async (req: any, res) => {
    try {
      const tourney = req.body
      const creator = await getUserById(req.session.user.id)
      const tournament = await newTournament(tourney, creator)
      res.json({
        success: true,
        tournament: tournamentEntityToJson(tournament),
      })
    } catch (e) {
      console.error('tournamentRouter error:', e)
      res.status(500).json({ success: false })
    }
  }),
)

// get all tournaments
router.get(
  '/',
  asyncHandler(async (req: any, res) => {
    // return json
    return res.json()
  }),
)

// get tournament by id
router.get(
  '/:tournamentId',
  asyncHandler(async (req: any, res) => {
    // return json
    const tournament = await getTournamentById(req.params.tournamentId)
    return res.json({ tournament })
  }),
)

// TODO
// delete a tournament
// router.delete(
//   '/:tournamentId',
//   asyncHandler(async (req, res) => {}),
// )

export default router
