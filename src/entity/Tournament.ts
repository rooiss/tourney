import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { TournamentUser } from './TournamentUser'
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
    () => TournamentUser,
    (tournamentUser) => tournamentUser.tournament,
  )
  tournamentUsers: TournamentUser[]

  @ManyToOne(() => User, (user) => user.tournaments)
  @JoinColumn()
  creator: User
}
