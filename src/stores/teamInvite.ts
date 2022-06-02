import { getManager } from 'typeorm'
// import * as nodemailer from 'nodemailer'
import { TeamInvite as TeamInviteJson, TeamInviteStatus } from '../types/team'
import { TeamInvite } from '../entity/TeamInvite'
// import { TournamentTeam } from '../entity/TournamentTeam'
import { TeamUser } from '../entity/TeamUser'
import { User } from '../entity/User'

export const getInvitesByTournamentAndEmail = async (
  tournamentId: string,
  email: string,
): Promise<TeamInviteJson[]> => {
  const entityManager = getManager()
  const result = await entityManager.query(
    `SELECT 
    "TeamInvite"."id" AS "id",
    "TeamInvite"."email" AS "TeamInvite_email",
    "TeamInvite"."status" AS "TeamInvite_status",
    "TeamInvite"."teamId" AS "TeamInvite_teamId",
    "TeamInvite__team"."id" AS "TeamInvite__team_id",
    "TeamInvite__team"."teamName" AS "teamName",
    "TeamInvite__team"."tournamentId" AS "TeamInvite__team_tournamentId",
    "TeamInvite__team__tournament"."id" AS "TeamInvite__team__tournament_id",
    "TeamInvite__team__tournament"."selectedDate" AS "TeamInvite__team__tournament_selectedDate",
    "TeamInvite__team__tournament"."location" AS "TeamInvite__team__tournament_location",
    "TeamInvite__team__tournament"."creatorId" AS "TeamInvite__team__tournament_creatorId",
    "user"."id" as "userId",
    "user"."firstName" AS "firstName",
    "user"."lastName" AS "lastName",
    "user"."username" AS "username"
    FROM "team_invite" "TeamInvite"
    LEFT JOIN
    "user"
    ON
    "TeamInvite"."email" = "user"."email"
    LEFT JOIN
    "tournament_team" "TeamInvite__team"
    ON
    "TeamInvite__team"."id"="TeamInvite"."teamId"
    LEFT JOIN
    "tournament" "TeamInvite__team__tournament"
    ON
    "TeamInvite__team__tournament"."id"="TeamInvite__team"."tournamentId"
    WHERE "TeamInvite"."email" = $1
    AND "TeamInvite__team__tournament"."id" = $2`,
    [email, tournamentId],
  )
  return result.map((row) => ({
    id: row.id,
    teamName: row.teamName,
    email: row.TeamInvite_email,
    firstName: row.firstName,
    lastNameLetter: row.lastName ? row.lastName[0] : null,
    userId: row.userId,
    status: row.TeamInvite_status,
    tournamentId: row.TeamInvite__team__tournament_id,
  }))
}

export const acceptTeamInviteStore = async (
  teamInviteId: string,
  currentUser: User,
) => {
  const entityManager = getManager()
  let teamInvite = await entityManager.findOne(TeamInvite, {
    where: { id: teamInviteId, email: currentUser.email },
    relations: ['team'],
  })
  // ensure that the invite is for this user
  if (!teamInvite) {
    throw new Error(`inviteid ${teamInviteId} doesnt exist for current user`)
  }
  // ensure that user isnt already on another team
  // let isOnTeam = await entityManager.findOne(TeamInvite, {
  //   where: {email: currentUser.email, status: TeamInviteStatus.ACCEPTED}
  // })
  // const allTeams = getInvitesByTournamentAndEmail()
  teamInvite.status = TeamInviteStatus.ACCEPTED
  teamInvite = await entityManager.save(teamInvite)
  console.log('changed status to accepted', teamInvite.status)
  // add them as a teamuser to that team
  const teammate = entityManager.create(TeamUser, {
    teamRole: teamInvite.teamRole,
    user: currentUser,
    tournamentTeam: teamInvite.team,
  })
  console.log('adding user to team', teammate)
  return await entityManager.save(teammate)
}

export const rejectTeamInviteStore = async (teamInviteId: string) => {
  console.log('rejecting invite')
  const entityManager = getManager()
  const teamInvite = await entityManager.findOne(TeamInvite, teamInviteId)
  teamInvite.status = TeamInviteStatus.REJECTED
  console.log('teamInvite', teamInvite)
  return await entityManager.save(teamInvite)
}

export const rejectAllTeamInviteStore = async (
  tournamentId: string,
  email: string,
  ignoreId?: string,
) => {
  const entityManager = getManager()
  let allTeamInvites = await getInvitesByTournamentAndEmail(tournamentId, email)
  if (ignoreId) {
    allTeamInvites = allTeamInvites.filter((invite) => {
      invite.id !== ignoreId
    })
  }
  const rejectedTeamInvites = allTeamInvites.map((teamInvite) => {
    return { ...teamInvite, status: TeamInviteStatus.REJECTED }
  })
  return await entityManager.save(rejectedTeamInvites)
}

// export const sendTeamInvites = async (email, inviteId) => {
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       type: 'OAuth2',
//       user: process.env.MAIL_USERNAME,
//       pass: process.env.MAIL_PASSWORD,
//       clientId: process.env.OAUTH_CLIENTID,
//       clientSecret: process.env.OAUTH_CLIENT_SECRET,
//       refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//     },
//   } as any)

//   // use inviteId in the body of the email
//   //
//   let message = {
//     from: 'volleyballtournamentapp@gmail.com',
//     to: `${email}`,
//     subject: 'Complete registration to be apart of your team!',
//     text: 'Plaintext version of the message',
//     // build url with verifycode
//     html: `<a href="${process.env.HOSTNAME}/verifyme/${verifyCode}">click to verify your account</a>`,
//   }
// }
