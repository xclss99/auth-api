import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
  BaseEntity
} from 'typeorm'

export abstract class DetailedBase extends BaseEntity {
  /** 自增id */
  @PrimaryGeneratedColumn({ comment: '自增id' })
  id: number

  /** 创建人id */
  @Column({ comment: '创建人id' })
  creatorId: number

  /** 更新人id */
  @Column({ comment: '更新人id' })
  updaterId: number

  /** 创建时间 */
  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date

  /** 更新时间 */
  @UpdateDateColumn({ comment: '更新时间' })
  updateTime: Date

  /** 更新次数 */
  @VersionColumn({ select: false, default: 0, comment: '更新次数' })
  version: number

  /** 软删除 */
  @Column({ type: 'boolean', default: false, select: false, comment: '软删除' })
  isDelete: boolean
}
