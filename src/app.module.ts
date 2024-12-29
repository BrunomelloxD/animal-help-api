import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { OngModule } from './modules/ong/ong.module';

@Module({
  imports: [UserModule, AuthModule, OngModule],
})
export class AppModule {}
