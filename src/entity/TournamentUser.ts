import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @ManyToOne(() => User, (user) => user.tournaments)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
  creator: User
}
