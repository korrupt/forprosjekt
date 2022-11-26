import { Module } from '@nestjs/common';
import { User, UserAuth, UserAuthSchema, UserSchema } from '@forprosjekt/api/user/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiUserService, ApiUserAuthService, UserAuthResolver } from '@forprosjekt/api/user/data-access';
import { ApiAuthModule } from '@forprosjekt/api/auth/feature';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserAuth.name, schema: UserAuthSchema },
    ]),
    ApiAuthModule,
  ],
  providers: [ApiUserService, ApiUserAuthService, UserAuthResolver],
})
export class ApiUserModule {}
