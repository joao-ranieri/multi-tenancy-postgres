import { UserModule } from './modules/users/user.module';
import { Module } from '@nestjs/common';


@Module({
  imports: [
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
