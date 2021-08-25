import { TournamentTeam } from '../entity/TournamentTeam'
import { Team as TeamJson } from '../types/team'
import { teamUserEntityToJson } from './teamUserEntityToJson'

export function teamEntityToJson(team: TournamentTeam): TeamJson {
  return {
    id: team.id,
    teamName: team.teamName,
    teamUsers: team.teamUsers.map(teamUserEntityToJson),
  }
}
