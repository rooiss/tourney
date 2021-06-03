import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
// index is for making sure on the backend that there are no duplicates
@Index(['personFollowing', 'personToFollow'], { unique: true })
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  personFollowing: User

  @ManyToOne(() => User)
  personToFollow: User
}
