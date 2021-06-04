import { Router } from 'express'
import { followUser, getUserById, getFollowedUsers } from '../stores/users'
import asyncHandler from '../utils/asyncHandler'
import { userEntityToSearchResult } from '../mappers/userToJson'

const router = Router()

router.post(
  '/',
  asyncHandler(async (req: any, res) => {
    // call followUser
    const personToFollow = await getUserById(req.body.id)
    const personFollowing = await getUserById(req.session.user.id)

    await followUser(personToFollow, personFollowing)
    res.json({})
  }),
)

router.get(
  '/',
  asyncHandler(async (req: any, res) => {
    // get all users that req.session is following
    const personFollowing = await getUserById(req.session.user.id)
    const followedUsers = await getFollowedUsers(personFollowing)
    // always return json from a get request
    console.log('followedUsers', followedUsers)
    return res.json({
      followedUsers: followedUsers.map(({ personToFollow }) =>
        userEntityToSearchResult(personToFollow),
      ),
    })
  }),
)

export default router
