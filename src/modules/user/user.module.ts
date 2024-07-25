import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services/prisma.service';
import { UserAuthController, UserController } from './controllers/index';
import { UserClientRepository, UserRepository } from './repositories/index';
import {
  UserAuthService,
  UserClientService,
  UserService,
} from './services/index';

@Module({
  imports: [],
  controllers: [UserController, UserAuthController],
  providers: [
    UserService,
    UserAuthService,
    UserClientService,
    UserRepository,
    UserClientRepository,
    PrismaService,
  ],
})
export class UserModule {}
