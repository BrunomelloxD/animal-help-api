import { Injectable } from '@nestjs/common';
import { CreateOngRequestDTO } from '../dtos';
import { OngClientRepository } from '../repositories/index';
import { OngEntity } from '../entities/ong.entity';
import { UpdateOngRequestDTO } from '../dtos/update.ong-request.dto';

@Injectable()
export class OngClientService {
  constructor(private readonly ongClientRepository: OngClientRepository) {}

  async softDelete(id: string): Promise<OngEntity> {
    return await this.ongClientRepository.softDelete(id);
  }

  async exists(id: string): Promise<boolean> {
    return await this.ongClientRepository.get(id);
  }

  async findAll(): Promise<OngEntity[]> {
    return await this.ongClientRepository.findAll();
  }

  async save(
    payload: CreateOngRequestDTO,
    user_id: string,
  ): Promise<OngEntity> {
    return await this.ongClientRepository.save(payload, user_id);
  }

  async update(id: string, payload: UpdateOngRequestDTO) {
    return await this.ongClientRepository.update(id, payload);
  }
}
