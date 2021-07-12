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
// import { Divisions, Format } from '../types/tournament'

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  selectedDate: string

  @Column('varchar')
  location: string

  // @Column('money')
  // price: string

  // @Column('enum')
  // divisions: Divisions[]

  // @Column('enum')
  // format: Format[]

  @OneToMany(
    () => TournamentTeam,
    (tournamentTeam) => tournamentTeam.tournament,
  )
  tournamentTeam: TournamentTeam[]

  @ManyToOne(() => User, (user) => user.tournaments)
  @JoinColumn()
  creator: User
}
