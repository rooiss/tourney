import { Tournament } from '../entity/Tournament'
import { getManager } from 'typeorm'
import { User } from '../entity/User'

export const newTournament = async (tourneyInfo, creator: User) => {
  const entityManager = getManager()
  const tournament = entityManager.create(Tournament, tourneyInfo)
  tournament.creator = creator
  return await entityManager.save(tournament)
}
