import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from './User'
import { Tournament } from './Tournament'

@Entity()
export class TournamentUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  location: string

  @Column('boolean')
  paid: boolean

  @ManyToOne(() => User, (user) => user.tournamentUsers)
  user: User

  @ManyToOne(() => Tournament, (tournament) => tournament.tournamentUsers)
  tournament: Tournament

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
