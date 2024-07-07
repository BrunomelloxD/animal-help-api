import { Module } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service';
import { UserAuthController, UserController } from './controllers/index';
import { UserRepository } from './repositories/user.repository';
import { UserAuthService, UserService } from './services/index';

@Module({
  imports: [],
  controllers: [UserController, UserAuthController],
  providers: [UserService, UserAuthService, UserRepository, PrismaService],
})
export class UserModule {}
