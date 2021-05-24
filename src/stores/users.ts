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
  // email = email.toLowerCase()
  // console.log('email', email)
  return entityManager.findOne(User, { where: { email: ILike(email) } })
}
