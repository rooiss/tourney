import { TeamInviteStatus } from '../types/team'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TournamentTeam } from './TournamentTeam'

@Entity()
export class TeamInvite {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => TournamentTeam, (team) => team.invites)
  team: TournamentTeam

  @Column('varchar')
  email: string

  @Column({ type: 'enum', enum: TeamInviteStatus, default: 'pending' })
  status: TeamInviteStatus
}
