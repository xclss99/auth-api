import { Column, Entity } from 'typeorm'
import { DetailedBase } from '~/entities'

@Entity('user')
export class User extends DetailedBase {
  @Column()
  mobile: string

  @Column()
  username: string

  @Column()
  password: string
}
