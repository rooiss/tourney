import { Follow } from '../entity/Follow'
import { getManager, ILike } from 'typeorm'
import { User } from '../entity/User'
import { SignUpCred } from '../types/users'

export const createUser = async (userInfo: SignUpCred) => {
  const entityManager = getManager()
  const user = entityManager.create(User, userInfo)
  return await entityManager.save(user)
}

export const getUserByUsername = async (username: string) => {
  const entityManager = getManager()
  return entityManager.findOne(User, { where: { username: ILike(username) } })
}

export const getUserByEmail = async (email: string) => {
  const entityManager = getManager()
  return entityManager.findOne(User, { where: { email: ILike(email) } })
}

export const getUserById = async (id: string) => {
  const entityManager = getManager()
  return entityManager.findOne(User, id)
}

// export const getUsernamesById = async (id: string) => {
//   const entityManager = getManager()

// }

export const searchUsersByAll = async (term: string): Promise<User[]> => {
  const entityManager = getManager()
  // separate out the search in here
  // if the term.length > 1, then look for first and last name
  // shouldn't be able to enter more than 2 words in a search term
  // if term has any spaces then make it an array?

  const terms = term.split(' ')
  if (terms.length > 1) {
    return entityManager.find(User, {
      where: {
        firstName: ILike(`%${terms[0]}%`),
        lastName: ILike(`%${terms[1]}%`),
      },
    })
  }
  return entityManager.find(User, {
    where: [
      { username: ILike(`%${terms[0]}%`) },
      { email: ILike(`%${terms[0]}%`) },
    ],
  })
}

export const followUser = async (
  personToFollow: User,
  personFollowing: User,
) => {
  // needs to take in the current user and the user to follow
  const entityManager = getManager()
  const follow = entityManager.create(Follow, {
    personToFollow,
    personFollowing,
  })
  return await entityManager.save(follow)
}

export const getFollowedUsers = async (personFollowing: User) => {
  const entityManager = getManager()
  return await entityManager.find(Follow, {
    where: { personFollowing: `${personFollowing.id}` },
    relations: ['personToFollow'],
  })
}

// stores should just return entity objects
