import { Injectable } from '@nestjs/common';
import { ExistsUserDTO } from '../dtos/exists-user.dto';
import { CreateUserRequestDTO } from '../dtos/index';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async get(id: string): Promise<User> {
    return await this.userRepository.get(id);
  }

  async save(payload: CreateUserRequestDTO): Promise<User> {
    return await this.userRepository.save(payload);
  }

  async exists(payload: ExistsUserDTO): Promise<boolean> {
    if (payload.id) {
      const user = await this.userRepository.get(payload.id);
      return !!user;
    }

    const user = await this.userRepository.getByEmail(payload.email);
    return !!user;
  }
}
