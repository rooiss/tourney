import { Status } from 'game'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { TournamentTeam } from './TournamentTeam'

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  state: Status

  @OneToOne(() => TournamentTeam)
  @JoinColumn()
  winner: TournamentTeam

  @OneToOne(() => TournamentTeam)
  @JoinColumn()
  refTeam: TournamentTeam
}
