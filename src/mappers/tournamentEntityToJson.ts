import { Tournament } from '../entity/Tournament'
import { Tournament as TournamentJson } from '../types/tournament'

export function tournamentEntityToJson(tournament: Tournament): TournamentJson {
  return { id: tournament.id }
}
