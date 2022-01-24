import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Division {
  @PrimaryColumn()
  id: string

  @Column()
  name: string
}
