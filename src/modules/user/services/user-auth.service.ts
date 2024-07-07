import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { AuthUserRequestDTO } from '../dtos/index';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class UserAuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticate(payload: AuthUserRequestDTO) {
    const user: User = await this.userRepository.getByEmail(payload.email);

    return user;
  }
}
