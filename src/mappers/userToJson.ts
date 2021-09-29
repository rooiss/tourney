import { User as UserEntity } from '../entity/User'
import { UserToSearchResult } from '../types/users'

export function userEntityToSearchResult(
  userEntity: UserEntity,
): UserToSearchResult {
  // take user entity and convert it to json
  return {
    id: userEntity.id,
    username: userEntity.username,
    firstName: userEntity.firstName,
    lastNameLetter: userEntity.lastName[0],
  }
}

export function userEntityToTournament(userEntity) {
  return {
    id: userEntity.id,
    username: userEntity.username,
  }
}

// export function userEntityToFollowingTournamentResult(userEntity: UserEntity,): UserTo
