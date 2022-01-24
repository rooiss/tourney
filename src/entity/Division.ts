import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Division {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string
}
