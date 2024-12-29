import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequestDTO {
  @MaxLength(150)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    maxLength: 150,
    example: 'Bruno Mello',
    description: `Nome <br>
    <em>Nome de usuario ou nome, algo descritivo que identifique ou descreva o usuario.</em><hr>`,
  })
  name: string;

  @MaxLength(255)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    maxLength: 255,
    minLength: 8,
    example: 'A123@123a',
    description: `Senha <br>
    <em>Senha para autenticao conforme a estrutura definida pelo Cerberus "password_length", "password_strength" e "required_fields"</em><hr>`,
  })
  password: string;

  @MaxLength(150)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    maxLength: 150,
    example: 'brunomello@email.com.br',
    description: `E-mail <br>
    <em>E-mail valido para autenticacao, recuperacao de senha e contato, algo unico.</em><hr>`,
  })
  email: string;
}
