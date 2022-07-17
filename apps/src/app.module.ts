import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.0.64',
      port: 23306,
      username: 'root',
      password: 'Dl123456',
      database: 'vote',
      autoLoadEntities: true,
      synchronize: true,
    }),AdminModule],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule {}
