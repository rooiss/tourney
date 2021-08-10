import { Tournament } from '../entity/Tournament'
import { Tournament as TournamentJson } from '../types/tournament'

export function tournamentEntityToJson(tournament: Tournament): TournamentJson {
  console.log('tournament entity to json', tournament)
  return {
    id: tournament.id,
    tourneyLocation: tournament.location,
    creator: tournament.creator,
    selectedDate: tournament.selectedDate,
    // creator:
    // creatorUsername: tournament.creator.username,
  }
}
