import { getTournamentById } from './tournaments'
import { getManager } from 'typeorm'
import { TournamentTeam } from '../entity/TournamentTeam'

// adding a new team
// export const newTeam = async (tournamentId, teamInfo) => {
//   const entityManager = getManager()
//   const tournament = await getTournamentById(tournamentId)
//   const team = entityManager.create(TournamentTeam, teamInfo)
//   tournament.tournamentTeam = teamInfo
//   return await entityManager.save(team)
// }

export const getTeamByTournament = async (
  tournamentId: string,
  teamName: string,
) => {
  const entityManager = getManager()
  const tournament = await getTournamentById(tournamentId)
  return await entityManager.findOne(TournamentTeam, {
    where: {
      tournament: tournament,
      teamName: teamName,
    },
  })
}
