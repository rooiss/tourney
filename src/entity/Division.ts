import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Division {
  @PrimaryColumn('string')
  id: string

  @Column()
  name: string
}
