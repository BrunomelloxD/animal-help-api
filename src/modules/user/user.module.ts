import { Module } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class UserModule {}
