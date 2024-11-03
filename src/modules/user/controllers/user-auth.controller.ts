import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  NotFoundException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { IsPublic } from 'src/common/decorators/auth-guard.decorator';
import { AuthUserRequestDTO } from '../dtos/index';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Auth')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserAuthController {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
  ) {}

  @Post('auth')
  @IsPublic()
  async auth(@Body() payload: AuthUserRequestDTO) {
    const user = await this.userService.exists({ email: payload.email });

    if (!user)
      throw new NotFoundException(
        `User with email ${payload.email} does not exist`,
      );

    return await this.userAuthService.authenticate(payload);
  }
}
