import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface TokenPayload {
  id: string;
  name: string;
  email: string;
}

export const User = createParamDecorator(
  (data: keyof TokenPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token: TokenPayload = request.user;

    return data ? token?.[data] : token;
  },
);
