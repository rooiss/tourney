import { Tournament } from '../entity/Tournament'
import { Tournament as TournamentJson } from '../types/tournament'

export function tournamentEntityToJson(tournament: Tournament): TournamentJson {
  // console.log('tournament', tournament)
  return {
    id: tournament.id,
    tourneyLocation: tournament.location,
    creator: tournament.creator,
    selectedDate: tournament.selectedDate,
  }
}
