import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsPostalCode, MaxLength } from 'class-validator';

export class UpdateOngRequestDTO {
  @MaxLength(150)
  @IsString()
  @ApiProperty({
    maxLength: 150,
    example: 'ONG Amigos do Bem',
    description: `Nome da ONG <br>
    <em>Nome que identifique ou descreva a ONG.</em><hr>`,
  })
  name?: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  @ApiProperty({
    maxLength: 255,
    example: 'imagem_perfil.jpg',
    description: `Imagem de perfil da ONG <br>
    <em>Caminho ou URL da imagem que será usada como perfil da ONG.</em><hr>`,
  })
  profile_image?: string;

  @MaxLength(500)
  @IsString()
  @IsOptional()
  @ApiProperty({
    maxLength: 500,
    example: 'Descrição breve sobre a missão e valores da ONG.',
    description: `Descrição da ONG <br>
    <em>Texto descritivo sobre a ONG.</em><hr>`,
  })
  description?: string;

  @MaxLength(255)
  @IsString()
  @ApiProperty({
    maxLength: 255,
    example: 'Rua dos Exemplo, 123 - Bairro Modelo',
    description: `Endereço <br>
    <em>Endereço completo da ONG.</em><hr>`,
  })
  address?: string;

  @IsPostalCode('BR')
  @ApiProperty({
    example: '12345-678',
    description: `CEP <br>
    <em>CEP válido no formato brasileiro (#####-###).</em><hr>`,
  })
  cep?: string;
}
