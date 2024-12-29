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
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/common/decorators/auth-guard.decorator';
import { CreateUserRequestDTO } from '../dtos/index';
import { UserEntity } from '../entities/user.entity';
import { UserClientService, UserService } from '../services/index';
import { UpdateUserRequestDTO } from '../dtos/update-user-request.dto';

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
  async findAll(): Promise<UserEntity[]> {
    const users = await this.userClientService.findAll();

    if (!users.length) throw new NotFoundException('Users not found');

    return users.map((user) => new UserEntity(user));
  }

  @Post()
  @IsPublic()
  async save(@Body() payload: CreateUserRequestDTO): Promise<UserEntity> {
    if (await this.userClientService.exists({ email: payload.email }))
      throw new ConflictException(
        `User with email ${payload.email} already exists`,
      );

    const response = await this.userClientService.save(payload);
    return new UserEntity(response);
  }

  @Get(':id')
  @IsPublic()
  async get(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userClientService.get(id);

    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    return new UserEntity(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const exists = await this.userClientService.exists({ id });

    if (!exists)
      throw new NotFoundException(`User with id ${id} does not exist`);

    await this.userClientService.softDelete(id);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.NO_CONTENT)
  async restore(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.exists({ id });

    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);

    await this.userService.restore(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() payload: UpdateUserRequestDTO,
  ) {
    if (!(await this.userClientService.exists({ id })))
      throw new NotFoundException(`User with id ${id} does not exist`);

    return await this.userClientService.update(id, payload);
  }
}
