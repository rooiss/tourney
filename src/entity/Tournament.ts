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

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  selectedDate: string

  @Column('varchar')
  location: string

  @OneToMany(
    () => TournamentUser,
    (tournamentUsers) => tournamentUsers.tournament,
  )
  tournamentUsers: TournamentUser[]

  @ManyToOne(() => User, (user) => user.tournaments)
  @JoinColumn()
  creator: User
}
