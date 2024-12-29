import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreateOngRequestDTO } from '../dtos';
import { OngEntity } from '../entities/ong.entity';
import { UpdateOngRequestDTO } from '../dtos/update.ong-request.dto';

@Injectable()
export class OngClientRepository {
  constructor(private prismaService: PrismaService) {}

  async softDelete(id: string): Promise<OngEntity> {
    return await this.prismaService.client.ong.delete({
      id: id,
    });
  }

  async save(
    payload: CreateOngRequestDTO,
    user_id: string,
  ): Promise<OngEntity> {
    return await this.prismaService.client.ong.create({
      data: {
        name: payload.name,
        profile_image: payload.profile_image,
        description: payload.description,
        address: payload.address,
        cep: payload.cep.replace(/\D/g, ''),
        user_id: user_id,
      },
    });
  }

  async get(id: string): Promise<boolean> {
    const ong = await this.prismaService.client.ong.findFirst({
      where: {
        id,
      },
    });

    return !!ong;
  }

  async findAll(): Promise<OngEntity[]> {
    return await this.prismaService.client.ong.findMany();
  }

  async update(id: string, payload: UpdateOngRequestDTO) {
    return await this.prismaService.client.ong.update({
      where: {
        id: id,
      },
      data: {
        name: payload.name,
        profile_image: payload.profile_image,
        description: payload.description,
        address: payload.address,
        cep: payload.cep.replace(/\D/g, ''),
      },
    });
  }
}
