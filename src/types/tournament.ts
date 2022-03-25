import { UserToCreator } from './users'

export interface Tournament {
  id: string
  selectedDate: string
  tourneyLocation: TourneyLocation
  creator: UserToCreator
  creatorUsername?: string
}

export interface TourneyLocation {
  lat: number
  lng: number
  address: string
}
