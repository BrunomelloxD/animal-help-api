import { Injectable } from '@nestjs/common';
import { OngRepository } from '../repositories/index';
import { OngEntity } from '../entities/ong.entity';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { ExistsOngDTO } from '../dtos';

@Injectable()
export class OngService {
  constructor(
    private readonly ongRepository: OngRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async exists(payload: ExistsOngDTO): Promise<boolean> {
    return await this.ongRepository.exists(payload);
  }

  async softDelete(id: string): Promise<OngEntity> {
    return this.prismaService.client.ong.delete({
      id: id,
    });
  }

  async restore(id: string) {
    return await this.prismaService.ong.update({
      where: {
        id: id,
      },
      data: {
        deleted_at: null,
      },
    });
  }
}
