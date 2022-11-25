import { ApiApolloModule } from '@forprosjekt/api/apollo/feature';
import { ApiAuthService } from '@forprosjekt/api/auth/data-access';
import { ApiAuthModule } from '@forprosjekt/api/auth/feature';
import { ApiDatabaseModule } from '@forprosjekt/api/database/feature';
import { ApiUserModule } from '@forprosjekt/api/user/feature';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiDatabaseModule, ApiAuthModule, ApiUserModule, ApiApolloModule],
  providers: [ApiAuthService],
})
export class ApiCoreModule {}
