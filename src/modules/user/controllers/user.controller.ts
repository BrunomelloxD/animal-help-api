import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDTO } from '../dtos/index';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find-all')
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new User(user));
  }

  @Post('create')
  async save(@Body() payload: CreateUserRequestDTO): Promise<User> {
    if (await this.userService.exists(payload.email)) {
      throw new ConflictException(
        `User with email ${payload.email} already exists`,
      );
    }

    const user = await this.userService.save(payload);
    return new User(user);
  }

  @Get(':id')
  async get(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.get(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    return new User(user);
  }
}
