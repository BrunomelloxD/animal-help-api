import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { ExistsUserDTO } from '../dtos/exists-user.dto';
import { CreateUserRequestDTO } from '../dtos/index';
import { User } from '../entities/user.entity';
import { UserClientRepository } from '../repositories/index';

@Injectable()
export class UserClientService {
  constructor(
    private readonly userClientRepository: UserClientRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userClientRepository.findAll();
  }

  async get(id: string): Promise<User> {
    return await this.userClientRepository.get(id);
  }

  async softDelete(id: string): Promise<User> {
    return this.prismaService.client.user.delete({
      id: id,
    });
  }

  async save(payload: CreateUserRequestDTO): Promise<User> {
    return await this.userClientRepository.save(payload);
  }

  async exists(payload: ExistsUserDTO): Promise<boolean> {
    if (payload.id) {
      const user = await this.userClientRepository.get(payload.id);
      return !!user;
    }

    const user = await this.userClientRepository.getByEmail(payload.email);
    return !!user;
  }
}