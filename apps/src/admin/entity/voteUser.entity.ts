import { Entity, Column } from "typeorm";
import { Base } from "./base.entity";
import { OneToOne } from 'typeorm/decorator/relations/OneToOne';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn';
import { User } from './user.entity';

/**
 * 候选人信息
 */
@Entity({name: 'vote_user', synchronize: true})
export class VoteUser extends Base {
  @Column({
    type: 'int',
    name: 'vote_id',
    comment: '选举主键id',
  })
  public voteId: number;

  @Column({
    type: 'varchar',
    name: 'user_id',
    comment: '候选人主键id',
  })
  public userId: number


  @OneToOne(() => User)
  @JoinColumn({name: 'user_id'})
  public user: User;


}
