import { User } from './users'

export interface Following {
  id: string
  personFollowing: User
  personToFollow: User
}
