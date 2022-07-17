import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/guard.strategy';
import { User } from './entity/user.entity';
import { Vote } from './entity/vote.entity';
import { VoteUser } from './entity/voteUser.entity';
import { Ticket } from './entity/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './contants/decorator.contants';
import { JwtStrategy } from './strategies/jwt.startegy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Vote, VoteUser, Ticket]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),],
  controllers: [ AdminController],
  providers: [
    AdminService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }]
})
export class AdminModule {}
