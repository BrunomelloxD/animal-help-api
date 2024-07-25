import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Delete,
  Get,
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
import { UserService } from '../services/user.service';

@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find-all')
  @IsPublic()
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new User(user));
  }

  @Post()
  @IsPublic()
  async save(@Body() payload: CreateUserRequestDTO): Promise<User> {
    if (await this.userService.exists({ email: payload.email })) {
      throw new ConflictException(
        `User with email ${payload.email} already exists`,
      );
    }

    const user = await this.userService.save(payload);
    return new User(user);
  }

  @Get(':id')
  @IsPublic()
  async get(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const exists = await this.userService.exists({ id });

    if (!exists) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    const user = await this.userService.get(id);

    return new User(user);
  }

  @Delete(':id')
  @IsPublic()
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const exists = await this.userService.exists({ id });

    if (!exists) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    await this.userService.softDelete(id);
  }
}
