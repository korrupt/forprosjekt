import { Module } from '@nestjs/common';
import { User, UserSchema } from "@forprosjekt/api/user/utils";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema }
  ])],
})
export class ApiUserModule {}
