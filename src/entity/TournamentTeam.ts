import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Division } from './Division'
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

  @ManyToOne(() => Tournament, (tournament) => tournament.tournamentTeam, {
    onDelete: 'CASCADE',
  })
  tournament: Tournament

  @OneToMany(() => TeamUser, (teamUser) => teamUser.tournamentTeam)
  teamUsers: TeamUser[]

  @OneToOne(() => Division)
  @JoinColumn()
  division: Division
}
