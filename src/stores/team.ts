import { getTournamentById } from './tournaments'
import { getManager } from 'typeorm'
import { TournamentTeam } from '../entity/TournamentTeam'
import { TeamUser } from '../entity/TeamUser'
import { Teammate, TeamRole } from '../types/team'
import { getUserById } from './users'
import { TeamInvite } from '../entity/TeamInvite'
import { User } from '../entity/User'

export const newTeam = async ({
  tournamentId,
  teamName,
  captainEmailOrId,
  teammates,
  currentUser,
}: {
  tournamentId: string
  teamName: string
  captainEmailOrId: string
  teammates: Teammate[]
  currentUser: User
}) => {
  const entityManager = getManager()
  // get tournament
  const tournament = await getTournamentById(tournamentId)
  // ensure current user doesn't belong to any other teams
  // create and save team
  let team = entityManager.create(TournamentTeam, {
    teamName: teamName,
    tournament: tournament,
  })
  team = await entityManager.save(team)

  // taking current user adding to team and saving it
  const teammate = entityManager.create(TeamUser, {
    // change to dynamic value
    teamRole:
      captainEmailOrId === currentUser.email ||
      captainEmailOrId === currentUser.id
        ? TeamRole.CAPTAIN
        : TeamRole.PLAYER,

    user: currentUser,
    tournamentTeam: team,
  })
  const currentTeammate = await entityManager.save(teammate)
  team.teamUsers = [currentTeammate]

  // creating invite entities for invited players
  const invites = await Promise.all(
    teammates
      // filtering out list for current user
      .filter((teammate) => teammate.email !== currentUser.email)
      .map((teammateUser) => {
        if (teammateUser.email) {
          // non registered user
          return Promise.resolve(teammateUser.email)
        }
        return getUserById(teammateUser.id).then((user) => user.email)
      }),
  ).then((emails) => {
    return emails.map((email) => {
      return entityManager.create(TeamInvite, {
        team: team,
        email: email,
        teamRole:
          captainEmailOrId === email ? TeamRole.CAPTAIN : TeamRole.PLAYER,
      })
    })
  })
  // assigning invites for the team
  team.invites = invites
  // saving invite entities to database
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

export const getTournamentTeamByUserId = async (
  userId: string,
  tournamentId: string,
) => {
  const entityManager = getManager()
  const result = await entityManager.query(
    `SELECT
    "TournamentTeam"."id" AS "tournamentTeamId"
    FROM "team_user" "TeamUser"
    LEFT JOIN
    "tournament_team" "TournamentTeam"
    ON
    "TeamUser"."tournamentTeamId" = "TournamentTeam"."id"
    WHERE "TeamUser"."userId" = $1
    AND "TournamentTeam"."tournamentId" = $2
    `,
    [userId, tournamentId],
  )
  const currentTeamId = result[0]?.tournamentTeamId
  if (!currentTeamId) {
    return null
  }
  return await getTeamByTeamId(currentTeamId)
}

export const getTeamByTeamId = async (teamId: string) => {
  const entityManager = getManager()
  return await entityManager.findOne(TournamentTeam, {
    where: { id: teamId },
    relations: ['teamUsers', 'teamUsers.user'],
  })
}

// get all teams from tournament
export const getAllTeamsByTournamentId = async (tournamentId: string) => {
  const entityManager = getManager()
  return await entityManager.find(TournamentTeam, {
    where: { tournament: tournamentId },
    relations: ['teamUsers', 'teamUsers.user'],
  })
}
