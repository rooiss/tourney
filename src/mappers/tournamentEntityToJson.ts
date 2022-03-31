import { Tournament } from '../entity/Tournament'
import { Tournament as TournamentJson } from '../types/tournament'
import { userEntityToTournament } from '../mappers/userToJson'

export function tournamentEntityToJson(tournament: Tournament): TournamentJson {
  return {
    id: tournament.id,
    tourneyLocation: tournament.location,
    creator: userEntityToTournament(tournament.creator),
    selectedDate: tournament.selectedDate,
    courts: tournament.courts,
  }
}
