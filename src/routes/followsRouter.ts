import { Router } from 'express'
import { followUser, getUserByUsername } from '../stores/users'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.post(
  '/',
  asyncHandler(async (req: any, res) => {
    // const personToFollow = the id of the user
    // console.log('hitting follow endpoint')
    // console.log('username to follow', req.body.username)
    console.log('person following', req.session)
    // call followUser
    const personToFollow = await getUserByUsername(req.body.username)
    const personFollowing = await getUserByUsername(req.session.user.username)

    followUser(personToFollow, personFollowing)
  }),
)

export default router
