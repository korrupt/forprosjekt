import { Module } from '@nestjs/common';
import { User, UserAuth, UserAuthSchema, UserSchema } from '@forprosjekt/api/user/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiUserService, ApiUserAuthService } from '@forprosjekt/api/user/data-access';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserAuth.name, schema: UserAuthSchema },
    ]),
  ],
  providers: [ApiUserService, ApiUserAuthService],
})
export class ApiUserModule {}
