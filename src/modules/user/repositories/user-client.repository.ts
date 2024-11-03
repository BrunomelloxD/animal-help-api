import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { security } from '../../../config/env';
import { PrismaService } from '../../database/services/prisma.service';
import { CreateUserRequestDTO } from '../dtos/index';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserClientRepository {
  constructor(private prismaService: PrismaService) {}
  async findAll(): Promise<UserEntity[]> {
    return await this.prismaService.client.user.findMany();
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.prismaService.client.user.findUnique({
      where: {
        email,
      },
    });
  }

  async get(id: string): Promise<UserEntity> {
    return await this.prismaService.client.user.findUnique({
      where: {
        id,
      },
    });
  }

  async save(payload: CreateUserRequestDTO): Promise<UserEntity> {
    payload.password = await bcrypt.hash(
      payload.password,
      security.bcrypt.saltOrRounds,
    );

    return await this.prismaService.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      },
    });
  }
}
