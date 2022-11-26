import { ApiApolloModule } from '@forprosjekt/api/apollo/feature';
import { ApiAuthModule } from '@forprosjekt/api/auth/feature';
import { ApiDatabaseModule } from '@forprosjekt/api/database/feature';
import { ApiUserModule } from '@forprosjekt/api/user/feature';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiDatabaseModule, ApiAuthModule, ApiUserModule, ApiApolloModule],
  providers: [],
})
export class ApiCoreModule {}
