import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDTO {
  @ApiProperty({
    description: 'Uuid gerado ap�s o cadastro de um usu�rio',
    example: 'd5bcb7d4-6c15-4fac-a1a9-caed6ce6eff6',
  })
  user_id: string;

  @ApiProperty({
    description: 'Nome do usu�rio cadastrado',
    example: 'Bruno Mello',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usu�rio cadastrado',
    example: 'brunomello.ti@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do usu�rio cadastrado',
    example: '1-575-471-2479',
  })
  phone: string;

  @ApiProperty({
    description: 'Data de cria��o do usu�rio',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data de atualia��o do usu�rio',
  })
  updated_at: Date;
}
