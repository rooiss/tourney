import { Tournament } from '../entity/Tournament'
import { getManager, In } from 'typeorm'
import { User } from '../entity/User'
import { Follow } from '../entity/Follow'

export const newTournament = async (tourneyInfo, creator: User) => {
  const entityManager = getManager()
  const tournament = entityManager.create(Tournament, tourneyInfo)
  tournament.creator = creator
  return await entityManager.save(tournament)
}

export const getTournamentById = async (tournamentId: string) => {
  const entityManager = getManager()
  return entityManager.findOne(Tournament, tournamentId)
}

export const getTournamentsFromAllUsersFollowing = async (
  userIdsOfFollowing: any,
) => {
  const entityManager = getManager()
  return entityManager.find(Tournament, {
    where: { creator: In(userIdsOfFollowing) },
  })
}
