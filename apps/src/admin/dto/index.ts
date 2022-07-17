import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEmail,
  IsNumber,
  Length,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { PageOptionsDto } from "./page.dto";
import { UserType } from '../entity/user.entity';
import { VoteStatus } from '../entity/vote.entity';



export class VoterDto extends PageOptionsDto {
  @ApiProperty({
    description: '选举信息id',
  })
  @IsNotEmpty({ message: '选举信息id不能为空' })
  readonly voteId: number;
  @ApiProperty({
    description: '候选人id',
  })
  @IsNotEmpty({ message: '候选人id不能为空' })
  readonly userId: number;
  @IsNotEmpty({ message: '邮箱地址不能为空' })
  @IsEmail({ message: '不是有效的邮箱地址' })
  readonly email: string;

  @ApiProperty({
    description: '身份证号码'
  })
  @IsString({ message: '不是有效的身份证号码' })
  @IsNotEmpty({ message: '身份证号码不能为空' })
  readonly passportNumber: string;

}



export class FindVoteUserDto extends PageOptionsDto {

  @ApiProperty({
    description: '候选人id',
  })
  @IsNotEmpty({ message: '选举id不能为空' })
  readonly userId: number;


  @ApiProperty({
    description: '选举信息id',
  })
  @IsNotEmpty({ message: '选举信息id不能为空' })
  readonly voteId: number;
}




export class VoteStatusDto {

  @ApiProperty({
    description: '候选人id',
  })
  @IsNotEmpty({ message: '选举id不能为空' })
  readonly id: number;

  @ApiProperty({
    description: '状态',
  })
  @IsNotEmpty({ message: '选举信息状态' })
  readonly status: VoteStatus;

}




export class UserInfo {
  @ApiProperty({
    description: '姓名',
  })
  @IsNotEmpty({ message: '姓名不能为空' })
  readonly name: string;

  @ApiProperty({
    description: '邮箱',
  })
  @IsNotEmpty({ message: '邮箱地址不能为空' })
  @IsEmail({ message: '不是有效的邮箱地址' })
  readonly email: string;

  @ApiProperty({
    description: '身份证号码'
  })
  @IsString({ message: '不是有效的身份证号码' })
  @IsNotEmpty({ message: '身份证号码不能为空' })
  readonly passportNumber: string;

  @ApiProperty({
    description: '用户类型',
    enum: UserType
  })
  @IsNotEmpty({ message: '用户类型不能为空' })
  readonly userType: UserType;
}

export class CandidateDto {
  @ApiProperty({
    description: '候选人id',
  })
  @IsNotEmpty({ message: '候选人id不能为空' })
  readonly candidateId: number;

  @ApiProperty({
    description: '选举id'
  })
  readonly voteId: number;
}

export class VoteDto {
  @ApiProperty({
    description: '候选人id数组',
  })
  @IsNotEmpty({ message: '候选人id不能为空' })
  @IsArray()
  @ArrayMinSize(2)
  readonly candidateIds: number[];

  @ApiProperty({
    description: '选举描述'
  })
  readonly desc: string;
}


export class VoteListInfo {
  @ApiProperty({
    description: '候选人id',
  })
  readonly userId: number;

  @ApiProperty({
    description: '候选人姓名'
  })
  readonly name: string;
}


export class LoginDto {
  @ApiProperty({
    description: '邮箱',
  })
  @IsNotEmpty({ message: '邮箱地址不能为空' })
  @IsEmail({ message: '不是有效的邮箱地址' })
  readonly email: string;

  @ApiProperty({
    description: '身份证号码'
  })
  @IsString({ message: '不是有效的身份证号码' })
  @IsNotEmpty({ message: '身份证号码不能为空' })
  readonly passportNumber: string;

}
