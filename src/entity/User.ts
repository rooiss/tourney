import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Tournament } from './Tournament'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 255 })
  username: string

  @Column('text')
  password: string

  @OneToMany(() => Tournament, (tournament) => tournament.creator)
  tournaments: Tournament[]
}
