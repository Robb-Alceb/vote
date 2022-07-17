import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CandidateDto, FindVoteUserDto, LoginDto, UserInfo, VoteDto, VoterDto, VoteStatusDto } from './dto';
import { User } from './entity/user.entity';
import { Public } from './guards/constants';
import { JwtAuthGuard } from './guards/guard.strategy';


@ApiTags('选举管理')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("/login")
  @ApiOperation({ summary: '管理员获取token' })
  @Public()
  async login(@Body() data: LoginDto) {
    return this.adminService.login(data);
  }

  @Post("/candidate")
  @ApiOperation({ summary: '创建候选人' })
  async createCandidate(@Body() data: UserInfo, @Req() req: {user: User}) {
    return this.adminService.createCandidate(data, req);
  }

  @Post('/vote')
  @ApiOperation({ summary: '创建一个选举' })
  async createVote(voteDto: VoteDto, @Req() req: { user: User }) {
    return await this.adminService.createVote(voteDto, req);
  }

  @Put('/candidate')
  @ApiOperation({ summary: '添加候选人' })
  async addCandidate(candidateDto: CandidateDto, @Req() req: { user: User }) {
    return await this.adminService.addCandidate(candidateDto, req);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询选举情况' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Param('id') id: number) {
    return await this.adminService.findAll(id);
  }

  @Get('/vote/detail')
  @ApiOperation({ summary: '查询投票人详情' })
  async findList(@Body() dto: FindVoteUserDto) {
    return this.adminService.findList(dto);
  }


  @Put('/vote')
  @ApiOperation({ summary: '修改选举信息状态' })
  async updateVoteStatus(@Body() dto: VoteStatusDto) {
    return this.adminService.updateVoteStatus(dto);
  }

  @Post('/voter')
  @ApiOperation({ summary: '用户投票' })
  async userVote(@Body() voterDto: VoterDto) {
    return await this.adminService.userVote(voterDto);
  }
}
