import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Status } from '../types/game'
import { TournamentTeam } from './TournamentTeam'
import { GameScore } from './GameScore'

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 'NOT_STARTED' })
  state: Status

  @OneToOne(() => TournamentTeam)
  @JoinColumn()
  winner?: TournamentTeam

  @OneToOne(() => TournamentTeam)
  @JoinColumn()
  refTeam: TournamentTeam

  @OneToMany(() => GameScore, (gameScore) => gameScore.game)
  gameScores: GameScore[]
}
