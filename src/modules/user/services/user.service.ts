import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserRequestDTO } from '../dtos/index';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private prismaService: PrismaService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async get(id: string): Promise<User> {
    return await this.userRepository.get(id);
  }

  async save(payload: CreateUserRequestDTO): Promise<User> {
    return await this.userRepository.save(payload);
  }

  async exists(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    return !!user;
  }
}
