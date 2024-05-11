import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('dogs')
export class DogsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  breed: string

  @Column()
  age: number

  @Column()
  photo: string
}
