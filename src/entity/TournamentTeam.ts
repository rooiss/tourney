import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { TeamUser } from './TeamUser'
import { Tournament } from './Tournament'

@Entity()
export class TournamentTeam {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index({ unique: true })
  @Column('varchar')
  teamName: string

  @ManyToOne(() => Tournament, (tournament) => tournament.tournamentTeam)
  tournament: Tournament

  @OneToMany(() => TeamUser, (teamUser) => teamUser.tournamentTeam)
  teamUser: TeamUser
}
