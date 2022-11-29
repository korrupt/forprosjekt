import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserAuth } from '@forprosjekt/api/user/utils';

import {
  ApiUserService,
  ApiUserAuthService,
  ApiUserAuthResolver,
  ApiUserResolver,
  ApiUserAclAdapter,
} from '@forprosjekt/api/user/data-access';
import { ApiAuthModule } from '@forprosjekt/api/auth/feature';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAuth]), ApiAuthModule],
  providers: [ApiUserService, ApiUserAuthService, ApiUserResolver, ApiUserAuthResolver, ApiUserAclAdapter],
})
export class ApiUserModule {}
