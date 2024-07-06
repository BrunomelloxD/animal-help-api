import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDTO {
  @ApiProperty({
    description: 'Uuid gerado após o cadastro de um usuário',
    example: 'd5bcb7d4-6c15-4fac-a1a9-caed6ce6eff6',
  })
  user_id: string;

  @ApiProperty({
    description: 'Nome do usuário cadastrado',
    example: 'Bruno Mello',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário cadastrado',
    example: 'brunomello.ti@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do usuário cadastrado',
    example: '1-575-471-2479',
  })
  phone: string;

  @ApiProperty({
    description: 'Data de criação do usuário',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data de atualiação do usuário',
  })
  updated_at: Date;
}
