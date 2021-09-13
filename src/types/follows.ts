import { UserToSearchResult } from './users'

export interface Following {
  id: string
  personFollowing: UserToSearchResult
  personToFollow: UserToSearchResult
}
