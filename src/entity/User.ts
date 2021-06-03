import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Follow } from './Follow'
import { Tournament } from './Tournament'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 255 })
  firstName: string

  @Column('varchar', { length: 255 })
  lastName: string

  @Column('varchar', { length: 255, unique: true })
  email: string

  @Column('varchar', { length: 255, unique: true })
  username: string

  @Column('text')
  password: string

  @OneToMany(() => Tournament, (tournament) => tournament.creator)
  tournaments: Tournament[]

  @OneToMany(() => Follow, (follow) => follow.personFollowing)
  follows: Follow[]
}
