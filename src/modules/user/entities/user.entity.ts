import { Column, Entity } from 'typeorm'
import { DetailedBaseEntity } from '~/entities'
import { Sex } from '~/enum'

@Entity('user')
export class UserEntity extends DetailedBaseEntity implements User {
  @Column({ comment: '手机号' })
  mobile: string

  @Column({ comment: '用户名' })
  username: string

  @Column({ comment: '密码' })
  password: string

  @Column({
    type: 'tinyint',
    default: Sex.secret,
    comment: '性别 (0: 男性, 1: 女性, 2: 保密)'
  })
  sex: number

  @Column({ nullable: true, comment: '头像' })
  avatar: string

  @Column({ nullable: true, comment: '个人简介' })
  profile: string

  @Column({ nullable: true, comment: '管理员备注' })
  remark: string

  @Column({ nullable: true, comment: '注册时间' })
  signUpTime: Date

  @Column({ nullable: true, comment: '首次登录时间' })
  firstLoginTime: Date

  @Column({ nullable: true, comment: '最后登录时间' })
  lastLoginTime: Date

  @Column({ nullable: true, comment: '注册IP' })
  signUpIP: string

  @Column({ nullable: true, comment: '首次登录IP' })
  firstLoginIP: string

  @Column({ nullable: true, comment: '最后登录IP' })
  lastLoginIP: string
}
