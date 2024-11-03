import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/services/prisma.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}
  async get(id: string): Promise<UserEntity> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
