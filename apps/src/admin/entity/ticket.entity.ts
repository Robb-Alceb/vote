import { Entity, Column, CreateDateColumn } from 'typeorm';
import { Base } from "./base.entity";

/**
 * 选票信息
 */
@Entity({name: 'ticket', synchronize: true})
export class Ticket extends Base {
  @Column({
    type: 'varchar',
    name: 'vote_id',
    comment: '选举信息id',
  })
  public voteId: number;


  @Column({
    type: 'varchar',
    name: 'user_id',
    comment: '候选人id',
  })
  public userId: number;

  @Column({
    type: 'varchar',
    name: 'passport_number',
    length: 31,
    comment: '投票人身份证号码',
  })
  public passportNumber: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 63,
    comment: '投票人邮箱',
  })
  public email: string;


}
