import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { ExistsUserDTO } from '../dtos/exists-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly prismaService: PrismaService,
  ) {}
  async exists(payload: ExistsUserDTO): Promise<boolean> {
    if (payload.id) {
      const user = await this.userRepository.get(payload.id);
      return !!user;
    }

    const user = await this.userRepository.getByEmail(payload.email);
    return !!user;
  }

  async restore(id: string) {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        deleted_at: null,
      },
    });
  }
}
