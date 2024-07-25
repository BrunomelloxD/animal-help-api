import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { IsPublic } from 'src/common/decorators/auth-guard.decorator';
import { AuthUserRequestDTO } from '../dtos/index';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Controller('user/auth')
export class UserAuthController {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
  ) {}

  @IsPublic()
  @Post()
  async authenticate(@Body() payload: AuthUserRequestDTO) {
    const user = await this.userService.exists({ email: payload.email });

    if (!user)
      throw new NotFoundException(
        `User with email ${payload.email} does not exist`,
      );

    return await this.userAuthService.authenticate(payload);
  }
}
