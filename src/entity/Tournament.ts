import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { TournamentTeam } from './TournamentTeam'
import { TourneyLocation } from '../types/tournament'

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  selectedDate: string

  @Column('int')
  courts: number

  @Column('json')
  location: TourneyLocation

  @OneToMany(
    () => TournamentTeam,
    (tournamentTeam) => tournamentTeam.tournament,
    { onDelete: 'CASCADE' },
  )
  tournamentTeam: TournamentTeam[]

  @ManyToOne(() => User, (user) => user.tournaments)
  @JoinColumn()
  creator: User
}
