import { Entity, Column } from "typeorm";
import { Base } from "./base.entity";

export enum UserType {
  Admin = 'admin', // 管理员
  Candidate = 'candidate', // 候选人
}

@Entity({name: 'user'})
export class User extends Base {
  @Column({
    type: 'varchar',
    name: 'name',
    length: 63,
    comment: '姓名',
  })
  public name: string;

  @Column({
    type: 'varchar',
    name: 'user_type',
    length: 63,
    comment: '用户类型',
  })
  public userType: UserType;

  @Column({
    type: 'varchar',
    name: 'passport_number',
    length: 31,
    comment: '身份证号码',
  })
  public passportNumber: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 63,
    comment: '邮箱',
  })
  public email: string;
}
