import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { OngEntity } from '../entities/ong.entity';
import { ExistsOngDTO } from '../dtos';

@Injectable()
export class OngRepository {
  constructor(private prismaService: PrismaService) {}

  async exists(payload: ExistsOngDTO): Promise<boolean> {
    const ong = await this.prismaService.ong.findFirst({
      where: {
        id: payload.id,
      },
    });

    return !!ong;
  }

  async softDelete(id: string): Promise<OngEntity> {
    console.log(id);

    return await this.prismaService.client.ong.update({
      where: {
        id: id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
