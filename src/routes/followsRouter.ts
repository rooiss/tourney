import { Router } from 'express'
import { followUser, getUserById, getFollowedUsers } from '../stores/users'
import asyncHandler from '../utils/asyncHandler'
import { userEntityToSearchResult } from '../mappers/userToJson'
import { followUserEntityToJson } from '../mappers/followUserEntityToJson'

const router = Router()

router.post(
  '/',
  asyncHandler(async (req: any, res) => {
    const personToFollow = await getUserById(req.body.id)
    const personFollowing = await getUserById(req.session.user.id)

    const newFollow = await followUser(personToFollow, personFollowing)
    return res.json({
      success: true,
      newFollow: followUserEntityToJson(newFollow),
    })
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
      success: true,
      followedUsers: followedUsers.map(({ personToFollow }) =>
        userEntityToSearchResult(personToFollow),
      ),
    })
  }),
)

export default router
