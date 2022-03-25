import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Game } from './Game'
import { TournamentTeam } from './TournamentTeam'

@Entity()
export class GameScore {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('int', { default: 0 })
  score: number

  @OneToOne(() => TournamentTeam)
  @JoinColumn()
  team: TournamentTeam

  @ManyToOne(() => Game, (game) => game.gameScores)
  @JoinColumn()
  game: Game
}
