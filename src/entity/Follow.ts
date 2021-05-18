import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  follower: string

  @Column()
  followed: string
}
