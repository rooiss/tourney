import { TeamInviteStatus, TeamRole } from '../types/team'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TournamentTeam } from './TournamentTeam'

@Entity()
export class TeamInvite {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => TournamentTeam, (team) => team.invites, {
    onDelete: 'CASCADE',
  })
  team: TournamentTeam

  @Column('varchar')
  email: string

  @Column({
    type: 'enum',
    enum: TeamInviteStatus,
    default: TeamInviteStatus.PENDING,
  })
  status: TeamInviteStatus

  @Column({ type: 'enum', enum: TeamRole, default: TeamRole.PLAYER })
  teamRole: TeamRole
}
