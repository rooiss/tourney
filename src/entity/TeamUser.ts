import { TeamRole } from '../types/team'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TournamentTeam } from './TournamentTeam'
import { User } from './User'

@Entity()
export class TeamUser {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column({ type: 'enum', enum: TeamRole })
  teamRole: TeamRole

  @ManyToOne(() => User, (user) => user.teamUsers)
  user: User

  @ManyToOne(
    () => TournamentTeam,
    (tournamentTeam) => tournamentTeam.teamUsers,
    { onDelete: 'CASCADE' },
  )
  tournamentTeam: TournamentTeam
}
