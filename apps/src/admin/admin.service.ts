import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserType } from './entity/user.entity';
import { Vote, VoteStatus } from './entity/vote.entity';
import { CandidateDto, FindVoteUserDto, LoginDto, UserInfo, VoteDto, VoterDto, VoteStatusDto } from './dto';
import { ApiException } from './exceptions/api.exception';
import { VoteUser } from './entity/voteUser.entity';
import { PageResult } from './dto/page.dto';
import { Ticket } from './entity/ticket.entity';
import { JwtService } from '@nestjs/jwt';
import _ from 'lodash';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    @InjectRepository(VoteUser)
    private readonly voteUserRepository: Repository<VoteUser>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 创建候选人
   */
  async login(data: LoginDto): Promise<{token: string}>{

    let {email, passportNumber} = data;
    let admin = await this.userRepository.findOne({where: {email, passportNumber, userType: UserType.Admin}})
    if(!admin){
      throw new ApiException(10200, '管理员不存在');
    }
    const payload = { id: admin.id, email: admin.email };
    return { token: this.jwtService.sign(payload) };
  }
  /**
   * 创建候选人
   */
  async createCandidate(candidateDto: UserInfo, req: { user: User }): Promise<User>{

    let {name, passportNumber, email, userType} = candidateDto;
    let admin = await this.findMe(req.user.id);
    if(!admin){
      throw new ApiException(10100, '用户无权限添加候选人');
    }
    if(await this.userRepository.count({where: {passportNumber, userType: UserType.Candidate}})){
      throw new ApiException(10101, '候选人已存在');
    }
    return await this.userRepository.save({name, passportNumber, email, userType});
  }

  /**
   * 创建一个选举
   * @param voteDto
   * @param req
   */
  async createVote(voteDto: VoteDto, req: { user: User }): Promise<void>{

    let {desc, candidateIds} = voteDto;
    let admin = await this.findMe(req.user.id);
    if(!admin){
      throw new ApiException(10102, '用户无权限添加候选人');
    }
    let vote = await this.voteRepository.save({desc, status: VoteStatus.Unstart});

    candidateIds.forEach(async (candidateId) => {
      await this.voteUserRepository.save({
        voteId: vote.id,
        userId: candidateId
      });
    });
  }

  /**
   * 添加选取候选人
   * @param candidateDto
   * @param req
   */
  async addCandidate(candidateDto: CandidateDto, req: { user: User }): Promise<VoteUser>{

    let {voteId, candidateId} = candidateDto;
    let admin = await this.findMe(req.user.id);
    if(!admin){
      throw new ApiException(10102, '用户无权限添加候选人');
    }
    if(voteId && !this.voteRepository.count({where: {id: voteId, status: VoteStatus.Unstart}})){
      throw new ApiException(10103, '选举信息不存在或选举已开始，或已结束，不能添加候选人');
    }
    return this.voteUserRepository.create({ voteId, userId: candidateId });
  }

  /**
   * 查询选举情况
   */
  async findAll(id: number) : Promise<any> {
    const rtn = {list: [], total: 0};
    /**
     * 获取所有候选人
     */
    const voteUsers = await this.voteUserRepository.find({
      where: { voteId: id }
    });
    rtn.total = voteUsers.length;
    /**
     * 获取所得票数
     */
    voteUsers.forEach(async (voteUser)=>{
      let count = await this.ticketRepository.count({where: {userId: voteUser.userId}});
      rtn.list.push(_.assign(voteUser, {count}));
    })
    return rtn;
  }

  /**
   * 查看投票详情
   */
  async findList({ page = 1, limit = 10, ...params }: FindVoteUserDto) : Promise<PageResult<Ticket>> {
    const { voteId, userId } = params;
    /**
     * 获取投票人列表
     */
    const [list, total] = await this.ticketRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: { voteId, userId },
      order: { id: 'DESC' },
    });
    return new PageResult<Ticket>(list, total);
  }



  /**
   * 更改选举状态
   * @param id
   */
  async updateVoteStatus(voteStatusDto: VoteStatusDto): Promise<Vote>{
    let {id, status} = voteStatusDto;
    let voteInfo: Vote;
    voteInfo = await this.voteRepository.findOne({where: {id}});

    /**
     * 判断候选人必须超过2人
     */
    if(status == VoteStatus.Starting && await this.voteUserRepository.count({where: {voteId: id}}) < 2){
      throw new ApiException(10104, "候选人不够不能开启选举")
    }
    await this.voteRepository.update(id, {status: status});
    voteInfo.status = status;

    /**
     * TODO 选举结束后发送邮件给投票人员
     */
    return voteInfo;
  }

  /**
   * 用户投票
   * @param id
   */
  async userVote(voterDto: VoterDto): Promise<any>{
    let {voteId, userId, email, passportNumber } = voterDto;

    if(await this.ticketRepository.count({where: {email, passportNumber}})){
      throw new ApiException(10106, "您已经投出您的选票，请不要重复投票")
    }
    if(await this.voteRepository.count({where: {id: voteId, status: VoteStatus.Starting}})){
      throw new ApiException(10107, "选举未开启或已结束")
    }
    if(await this.voteUserRepository.count({where: {voteId, userId}})){
      throw new ApiException(10108, "候选人不存在")
    }
    this.ticketRepository.create({voteId, userId, email, passportNumber });

    return this.findAll(voteId);
  }

  async findMe(id: number): Promise<User> {
    let userInfo: User

    userInfo = await this.userRepository.findOne({where: {id, userType: UserType.Admin}});
    return userInfo;
  }


}
