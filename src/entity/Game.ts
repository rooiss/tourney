import { Status } from '../types/game'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { TournamentTeam } from './TournamentTeam'
import { GameScore } from './GameScore'

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

  @OneToMany(() => GameScore, (gameScore) => gameScore.game)
  gameScores: GameScore
}
