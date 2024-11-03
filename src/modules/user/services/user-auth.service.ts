import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserRequestDTO } from '../dtos/index';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class UserAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(data: AuthUserRequestDTO) {
    const user: UserEntity = await this.userRepository.getByEmail(data.email);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const acess_token = await this.jwtService.signAsync(payload);

    const response = {
      acess_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    return response;
  }
}
