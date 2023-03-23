import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity
} from 'typeorm'

export abstract class Base extends BaseEntity {
  /** 自增id */
  @PrimaryGeneratedColumn({ comment: '自增id' })
  id: number

  /** 更新时间 */
  @UpdateDateColumn({ comment: '更新时间' })
  updateTime: Date

  /** 创建时间 */
  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date

  /** 软删除 */
  @Column({ type: 'boolean', default: false, select: false, comment: '软删除' })
  isDelete: boolean
}
