import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/common/decorators/auth-guard.decorator';
import { CreateUserRequestDTO } from '../dtos/index';
import { User } from '../entities/user.entity';
import { UserClientService } from '../services';
import { UserService } from '../services/user.service';

@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userClientService: UserClientService,
  ) {}

  @Get('find-all')
  @IsPublic()
  async findAll(): Promise<User[]> {
    const users = await this.userClientService.findAll();
    return users.map((user) => new User(user));
  }

  @Post()
  @IsPublic()
  async save(@Body() payload: CreateUserRequestDTO): Promise<User> {
    const user = await this.userClientService.exists({ email: payload.email });
    if (!user)
      throw new ConflictException(
        `User with email ${payload.email} already exists`,
      );

    const response = await this.userClientService.save(payload);
    return new User(response);
  }

  @Get(':id')
  @IsPublic()
  async get(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userClientService.get(id);

    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    return new User(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsPublic()
  async softDelete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const exists = await this.userClientService.exists({ id });

    if (!exists)
      throw new NotFoundException(`User with id ${id} does not exist`);

    await this.userClientService.softDelete(id);
  }

  @Post(':id/restore')
  @IsPublic()
  @HttpCode(HttpStatus.NO_CONTENT)
  async restore(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.exists({ id });

    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    await this.userService.restore(id);
  }
}
