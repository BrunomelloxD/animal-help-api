import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserRequestDTO } from '../dtos/index';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class UserAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(data: AuthUserRequestDTO) {
    const user: User = await this.userRepository.getByEmail(data.email);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
    };

    const acessToken = await this.jwtService.signAsync(payload);

    const response = {
      acessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    return response;
  }
}
