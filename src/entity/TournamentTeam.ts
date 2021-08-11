import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { TeamInvite } from './TeamInvite'
import { TeamUser } from './TeamUser'
import { Tournament } from './Tournament'

@Entity()
export class TournamentTeam {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index({ unique: true })
  @Column('varchar')
  teamName: string

  @OneToMany(() => TeamInvite, (invite) => invite.team)
  invites: TeamInvite[]

  @ManyToOne(() => Tournament, (tournament) => tournament.tournamentTeam)
  tournament: Tournament

  @OneToMany(() => TeamUser, (teamUser) => teamUser.tournamentTeam)
  teamUsers: TeamUser[]
}
