import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength, IsEmail } from 'class-validator';

export class UpdateUserRequestDTO {
  @MaxLength(150)
  @IsString()
  @ApiPropertyOptional({
    maxLength: 150,
    example: 'Bruno Mello',
    description: `Nome <br>
    <em>Nome de usuário ou nome, algo descritivo que identifique ou descreva o usuário.</em><hr>`,
  })
  name?: string;

  @MaxLength(150)
  @IsString()
  @IsEmail()
  @ApiPropertyOptional({
    maxLength: 150,
    example: 'brunomello@email.com.br',
    description: `E-mail <br>
    <em>E-mail válido para autenticação, recuperação de senha e contato, algo único.</em><hr>`,
  })
  email?: string;
}
