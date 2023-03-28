import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
  BaseEntity
} from 'typeorm'

export abstract class DetailedBaseEntity extends BaseEntity {
  /** 自增id */
  @PrimaryGeneratedColumn('increment', { comment: '自增id' })
  id: number

  /** 创建人id, 0代表数据库自动生成的 */
  @Column({ default: 0, comment: '创建人id, 0代表数据库自动生成的' })
  creatorId: number

  /** 更新人id */
  @Column({ default: 0, comment: '更新人id, 0代表数据库自动生成的' })
  updaterId: number

  /** 创建时间 */
  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date

  /** 更新时间 */
  @UpdateDateColumn({ comment: '更新时间' })
  updateTime: Date

  /** 更新次数 */
  @VersionColumn({ default: 0, comment: '更新次数' })
  version: number

  /** 软删除 */
  @Column({ type: 'boolean', select: false, default: false, comment: '软删除' })
  isDelete: boolean
}
