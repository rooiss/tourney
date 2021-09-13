import { Follow } from '../entity/Follow'
import { Following as FollowingToJson } from '../types/follows'

export function followUserEntityToJson(follow: Follow): FollowingToJson {
  return {
    id: follow.id,
    personFollowing: userFollowingToJson(follow.personFollowing),
    personToFollow: userFollowingToJson(follow.personToFollow),
  }
}

export function userFollowingToJson(personFollowing) {
  return {
    id: personFollowing.id,
    firstName: personFollowing.firstName,
    lastNameLetter: personFollowing.lastName[0],
    username: personFollowing.username,
  }
}
