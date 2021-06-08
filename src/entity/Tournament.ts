import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  selectedDate: string

  @Column('varchar')
  location: string

  @ManyToOne(() => User, (user) => user.tournaments)
  @JoinColumn()
  creator: User
}
