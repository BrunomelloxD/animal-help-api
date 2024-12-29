import { Module } from '@nestjs/common';
import { OngController } from './controllers/ong.controller';
import { OngService } from './services/index';
import { OngClientRepository, OngRepository } from './repositories/index';
import { PrismaService } from '../database/services/prisma.service';
import { OngClientService } from './services/ong-client.service';

@Module({
  controllers: [OngController],
  providers: [
    OngService,
    OngClientService,
    OngRepository,
    OngClientRepository,
    PrismaService,
  ],
})
export class OngModule {}
