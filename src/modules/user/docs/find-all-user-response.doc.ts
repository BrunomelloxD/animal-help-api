import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { CreateUserResponseDTO } from '../dtos/create-user-response.dto';

export const FIND_ALL_USER: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Retorna lista de usuários cadastrados',
  type: CreateUserResponseDTO,
  isArray: true,
};
