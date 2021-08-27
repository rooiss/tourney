import { User } from './users'

export interface Tournament {
  id: string
  selectedDate: string
  tourneyLocation: TourneyLocation
  creator: User
  creatorUsername?: string
  // teams:
}

export interface TourneyLocation {
  lat: number
  lng: number
  address: string
}
