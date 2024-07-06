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
    <em>Nome de usuário ou nome, algo descritivo que identifique ou descreva o usuário.</em><hr>`,
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
    <em>Senha para autenticação conforme a estrutura definida pelo Cerberus "password_length", "password_strength" e "required_fields"</em><hr>`,
  })
  password: string;

  @MaxLength(150)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    maxLength: 150,
    example: 'brunomello@email.com.br',
    description: `E-mail <br>
    <em>E-mail valido para autenticação, recuperação de senha e contato, algo único.</em><hr>`,
  })
  email: string;
}
