import { User } from '../entity/User'
import { getManager } from 'typeorm'

export const verifyUser = async (id: string) => {
  const entityManager = getManager()
  return await entityManager.update(User, id, { verified: true })
}
