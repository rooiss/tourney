import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TournamentTeam } from './TournamentTeam'
import { User } from './User'

@Entity()
export class TeamUser {
  @PrimaryGeneratedColumn('increment')
  id: string

  @ManyToOne(() => User, (user) => user.teamUsers)
  user: User

  @ManyToOne(() => TournamentTeam, (tournamentTeam) => tournamentTeam.teamUser)
  tournamentTeam: TournamentTeam
}
