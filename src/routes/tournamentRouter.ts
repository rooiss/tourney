import { Router } from 'express'
import { getFollowedUsers, getUserById } from '../stores/users'
import {
  getTournamentById,
  getTournamentsFromAllUsersFollowing,
  newTournament,
} from '../stores/tournaments'
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
    // saying this is is returning undefined look into this
    const user = await getUserById(req.session.user.id)
    const usersFollowing = await getFollowedUsers(user)

    // this returns a new array of just usernames that the user is following
    const userIdsOfFollowing = usersFollowing.map(
      (user) => user.personToFollow.id,
    )

    const tournaments = await getTournamentsFromAllUsersFollowing(
      userIdsOfFollowing,
    )
    return res.json({ tournaments })
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
