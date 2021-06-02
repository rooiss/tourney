import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  personFollowing: User

  @ManyToOne(() => User)
  personToFollow: User
}
