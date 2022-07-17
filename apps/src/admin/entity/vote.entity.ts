import { Entity, Column, CreateDateColumn } from 'typeorm';
import { Base } from "./base.entity";


export enum VoteStatus {
  Unstart = 'unstart', // 管理员
  Starting = 'starting', // 候选人
  Stop = 'stop', // 候选人
}

/**
 * 选举信息
 */
@Entity({name: 'vote', synchronize: true})
export class Vote extends Base {
  @Column({
    type: 'varchar',
    name: 'desc',
    length: 255,
    comment: '选举描述',
  })
  public desc: string;

  @Column({
    type: 'varchar',
    name: 'status',
    length: 31,
    comment: '选举状态',
  })
  public status: VoteStatus;



}
