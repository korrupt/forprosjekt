import { Module } from '@nestjs/common';
import { User, UserAuth, UserAuthSchema, UserSchema } from '@forprosjekt/api/user/utils';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserAuth.name, schema: UserAuthSchema },
    ]),
  ],
})
export class ApiUserModule {}
