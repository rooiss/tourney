import { Router } from 'express'
import { followUser, getUserById, getFollowedUsers } from '../stores/users'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.post(
  '/',
  asyncHandler(async (req: any, res) => {
    // call followUser
    const personToFollow = await getUserById(req.body.id)
    const personFollowing = await getUserById(req.session.user.id)

    followUser(personToFollow, personFollowing)
  }),
)

router.get(
  '/',
  asyncHandler(async (req: any, res) => {
    // get all users that req.session is following
    const personFollowing = await getUserById(req.session.user.id)
    const followedUsers = await getFollowedUsers(personFollowing)
    // always return json from a get request
    return res.json({
      followedUsers,
    })
  }),
)

export default router
