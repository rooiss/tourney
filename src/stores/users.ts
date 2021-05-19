import { getManager } from 'typeorm'
import { User } from '../entity/User'

const entityManager = getManager()

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
//     email,
//     password,
//   })
// }

export const getUserByUsername = async (username: string) => {
  return entityManager.findOne(User, { where: { username } })
}

export const getUserByEmail = async (email: string) => {
  return entityManager.findOne(User, { where: { email } })
}
