import { UserToCreator } from './users'

export interface Tournament {
  id: string
  selectedDate: string
  tourneyLocation: TourneyLocation
  creator: UserToCreator
  creatorUsername?: string
  courts: number
}

export interface TourneyLocation {
  lat: number
  lng: number
  address: string
}
