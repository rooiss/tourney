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
    const user = await getUserById(req.session.user.id)
    const usersFollowing = await getFollowedUsers(user)

    // this returns a new array of just usernames that the user is following
    const userIdsOfFollowing = usersFollowing.map(
      (user) => user.personToFollow.id,
    )

    const tournaments = await getTournamentsFromAllUsersFollowing(
      userIdsOfFollowing,
    )
    // const usernameOfCreator = await getUserById()
    return res.json({
      tournaments /* : tournaments.map(tournamentEntityToJson) */,
    })
  }),
)

// get tournament by id
router.get(
  '/:tournamentId',
  asyncHandler(async (req: any, res) => {
    // return json
    const tournament = await getTournamentById(req.params.tournamentId)
    // console.log('tournament', tournament)
    return res.json({ tournament /*: tournamentEntityToJson(tournament) */ })
  }),
)

// TODO
// delete a tournament
// router.delete(
//   '/:tournamentId',
//   asyncHandler(async (req, res) => {}),
// )

router.post(
  '/:tournamentId/teams',
  asyncHandler(async (req: any, res) => {
    const tournament = await getTournamentById(req.params.tournamentId)
  }),
)

export default router
