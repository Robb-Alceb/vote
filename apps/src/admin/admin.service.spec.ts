import { Test, TestingModule } from '@nestjs/testing';
import { User, UserType } from './entity/user.entity';
import { Vote, VoteStatus } from './entity/vote.entity';
import { AdminService } from './admin.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ticket } from './entity/ticket.entity';
import { JwtService } from '@nestjs/jwt';
import { VoteUser } from './entity/voteUser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const user = {id:1, name:"1",userType: UserType.Admin, passportNumber: "A123456(7)", email: "abcd@gmail.com", createdAt: new Date(), updatedAt: new Date(), deleteAt: null};

const candidate = {name: "zhangsan", email: "zhangsan@gmail.com", passportNumber: "A6543217)", userType: UserType.Candidate};

const voteDto = {candidateIds: [1,2], desc: "新的选举"};

const candidateDto = {candidateId: 3, voteId: 1};

const findVoteUserDto = {userId: 1, voteId: 1, limit: 10, page: 1};

const voteStatusDto = {id: 1, status: VoteStatus.Starting};

const voterDto = {voteId: 1, userId: 1, email: "a", passportNumber: "2"};

describe('AdminService', () => {
  let adminService: AdminService;
  let userRepository: Repository<User>;
  let voteRepository: Repository<Vote>;
  let voteUserRepository: Repository<VoteUser>;
  let ticketRepository: Repository<Ticket>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Vote, VoteUser, Ticket]),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: '192.168.0.64',
          port: 23306,
          username: 'root',
          password: 'Dl123456',
          database: 'vote',
          autoLoadEntities: true,
          synchronize: true,
          logging: true
        }),],
      providers: [
        AdminService,
        JwtService,
        ],
    }).compile();
    adminService = module.get<AdminService>(AdminService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    voteRepository = module.get<Repository<Vote>>(getRepositoryToken(Vote));
    voteUserRepository = module.get<Repository<VoteUser>>(getRepositoryToken(VoteUser));
    ticketRepository = module.get<Repository<Ticket>>(getRepositoryToken(Ticket));

  });
  let req = {user: user};


  describe('createCandidate()', () => {
    it('should createCandidate', async () => {
      let rtn = await adminService.createCandidate(candidate, req);
      expect(rtn.name).toEqual(candidate.name);
    });
  });

  describe('createVote()', () => {
    it('should createVote', async () => {
      await adminService.createVote(voteDto, req);
      // expect(rtn.name).toEqual(candidate.name);
    });
  });

  describe('addCandidate()', () => {
    it('should addCandidate', () => {
      expect(adminService.addCandidate(candidateDto, req));
    });
  });

  describe('findAll()', () => {
    it('should findAll', () => {
      expect(adminService.findAll(1));
    });
  });

  describe('findList()', () => {
    it('should findList"', () => {
      expect(adminService.findList(findVoteUserDto));
    });
  });

  describe('updateVoteStatus()', () => {
    it('should updateVoteStatus', () => {
      expect(adminService.updateVoteStatus(voteStatusDto));
    });
  });

  describe('userVote()', () => {
    it('should userVote', () => {
      expect(adminService.userVote(voterDto));
    });
  });
});
