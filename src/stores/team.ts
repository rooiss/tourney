import { getTournamentById } from './tournaments'
import { getManager } from 'typeorm'
import { TournamentTeam } from '../entity/TournamentTeam'
import { TeamUser } from '../entity/TeamUser'
import { Teammate, TeamRole } from '../types/team'
import { getUserById } from './users'
import { TeamInvite } from '../entity/TeamInvite'

export const newTeam = async ({
  tournamentId,
  teamName,
  captainId,
  teammates,
}: {
  tournamentId: string
  teamName: string
  captainId: string
  teammates: Teammate[]
}) => {
  const entityManager = getManager()
  // get tournament
  const tournament = await getTournamentById(tournamentId)
  // create and save team
  let team = entityManager.create(TournamentTeam, {
    teamName: teamName,
    tournament: tournament,
  })
  // tournamentId.tournamentTeam = teamName
  // team.teamName = teamName
  team = await entityManager.save(team)
  // create teamuser for curr user, assign created team to  tournamentTeam field
  const currentUser = await getUserById(captainId)
  const teammate = entityManager.create(TeamUser, {
    teamRole: TeamRole.CAPTAIN,
    user: currentUser,
    tournamentTeam: team,
  })
  const currentTeammate = await entityManager.save(teammate)
  team.teamUsers = [currentTeammate]

  const invites = await Promise.all(
    teammates
      .filter((teammate) => teammate.id !== captainId)
      .map((teammateUser) => {
        if (teammateUser.email) {
          // anon user
          return Promise.resolve(teammateUser.email)
        }
        return getUserById(teammateUser.id).then((user) => user.email)
      }),
  ).then((emails) => {
    return emails.map((email) => {
      return entityManager.create(TeamInvite, {
        team: team,
        email: email,
      })
    })
  })
  team.invites = invites
  await Promise.all(
    invites.map((invite) => {
      return entityManager.save(TeamInvite, invite)
    }),
  )
  return await entityManager.save(TournamentTeam, team)
}

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
