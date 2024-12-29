import {
  Body,
  ClassSerializerInterceptor,
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
import { OngService } from '../services/index';
import { IsPublic } from 'src/common/decorators/auth-guard.decorator';
import { OngEntity } from '../entities/ong.entity';
import { CreateOngRequestDTO } from '../dtos/create-ong-request.dto';
import { User } from 'src/modules/auth/decorators/auth.decorator';
import { OngClientService } from '../services/ong-client.service';
import { UpdateOngRequestDTO } from '../dtos/update.ong-request.dto';

@ApiTags('Ongs')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('ong')
export class OngController {
  constructor(
    private readonly ongService: OngService,
    private readonly ongClientService: OngClientService,
  ) {}

  @Get('find-all')
  @IsPublic()
  async findAll(): Promise<OngEntity[]> {
    const ongs = await this.ongClientService.findAll();

    if (!ongs.length) throw new NotFoundException('Ongs not found');

    return ongs.map((ong) => new OngEntity(ong));
  }

  @Post()
  async save(
    @Body() payload: CreateOngRequestDTO,
    @User('id') user_id: string,
  ): Promise<OngEntity> {
    return await this.ongClientService.save(payload, user_id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<OngEntity> {
    if (!(await this.ongClientService.exists(id)))
      throw new NotFoundException(`Ong with id ${id} does not exist`);

    return await this.ongClientService.softDelete(id);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.NO_CONTENT)
  async restore(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!(await this.ongService.exists(id)))
      throw new NotFoundException(`Ong with id ${id} does not exist`);

    return await this.ongService.restore(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() payload: UpdateOngRequestDTO,
  ) {
    if (!(await this.ongClientService.exists(id)))
      throw new NotFoundException(`Ong with id ${id} does not exist`);

    return await this.ongClientService.update(id, payload);
  }
}
