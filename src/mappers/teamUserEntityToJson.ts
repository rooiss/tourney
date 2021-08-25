import { TeamUser } from '../entity/TeamUser'
import { Teammate as TeamUserJson } from '../types/team'

export function teamUserEntityToJson(teamUser: TeamUser): TeamUserJson {
  return {
    // id: teamUser.id,
    firstName: teamUser.user.firstName,
    lastNameLetter: teamUser.user.lastName[0],
    username: teamUser.user.username,
  }
}
