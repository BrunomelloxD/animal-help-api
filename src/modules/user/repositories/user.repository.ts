import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { security } from '../../../config/env';
import { PrismaService } from '../../../infra/database/prisma.service';
import { CreateUserRequestDTO } from '../dtos/index';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}
  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async get(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async save(payload: CreateUserRequestDTO): Promise<User> {
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
