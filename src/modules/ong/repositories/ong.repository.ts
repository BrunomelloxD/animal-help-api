import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { OngEntity } from '../entities/ong.entity';

@Injectable()
export class OngRepository {
  constructor(private prismaService: PrismaService) {}

  async exists(id: string): Promise<boolean> {
    const ong = await this.prismaService.ong.findFirst({
      where: {
        id,
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
