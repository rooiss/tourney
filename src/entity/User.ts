import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Follow } from './Follow'
import { TeamUser } from './TeamUser'
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

  @Column()
  @Generated('uuid')
  verifyCode: string

  @Column({ default: false })
  verified: boolean

  @OneToMany(() => Tournament, (tournament) => tournament.creator)
  tournaments: Tournament[]

  @OneToMany(() => Follow, (follow) => follow.personFollowing)
  follows: Follow[]

  @OneToMany(() => TeamUser, (teamUser) => teamUser.user)
  teamUsers: TeamUser[]
}
