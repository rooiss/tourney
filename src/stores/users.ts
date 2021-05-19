import { getManager, ILike } from 'typeorm'
import { User } from '../entity/User'

// export const createUser = async ({
//   firstName,
//   lastName,
//   username,
//   email,
//   password,
// }) => {
//   const user = entityManager.create(User, {
//     firstName,
//     lastName,
//     username,
//     email: email.toLowerCase(),
//     password,
//   })
// }

export const getUserByUsername = async (username: string) => {
  const entityManager = getManager()
  return entityManager.findOne(User, { where: { username } })
}

export const getUserByEmail = async (email: string) => {
  const entityManager = getManager()
  // email = email.toLowerCase()
  // console.log('email', email)
  return entityManager.findOne(User, { where: { email: ILike(email) } })
}

// fdsfdsfs
